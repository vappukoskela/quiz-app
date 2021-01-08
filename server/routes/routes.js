const express = require('express');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const router = express.Router();
var jwt = require('jsonwebtoken');
const db = require('../db')
var bcrypt = require('bcrypt')
const SALT_ROUNDS = 12
let pwHashed;

router.post(
  '/register',
  passport.authenticate('register', { session: false }),
  async (req, res, next) => {
    db.query('SELECT * FROM users WHERE username = $1', [req.body.email]).then((result) => {
      console.log(result.rows)
      if (result.rows.length > 0) {
        console.log("User already exists")
        return res.status(409).json({ error: "User already exists!" })
      }
      else {
        console.log(req.body)
        bcrypt.hash(req.body.password, SALT_ROUNDS, (err, hash) => {
          pwHashed = hash;
          db.query('INSERT INTO users (username, password, firstname, surname) VALUES ($1,$2,$3,$4)', [req.body.email, pwHashed, req.body.firstname, req.body.surname])
          console.log(pwHashed)
        })
        return res.status(200).json({
          message: 'Signup successful',
          user: req.user
        });
      }
    });
  });

passport.use(
  'register',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const hash = await bcrypt.hash(password, 12);
        const user = {
          username: email,
          password: hash
        }
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

router.post(
  '/login',
  async (req, res, next) => {
    passport.authenticate(
      'login',
      async (err, user, info) => {
        try {
          if (err || !user) { // if error or user not found
            const error = new Error('An error occurred.');
            return next(error);
          }

          req.login( // else log in
            user,
            { session: false },
            async (error) => {
              if (error) return next(error);

              const body = { _id: user._id, email: user.email };
              const token = jwt.sign({ user: body }, 'TOP_SECRET');

              return res.json({ token });
            }
          );
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }
);


passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email });

        if (!user) {
          return done(null, false, { message: 'User not found' });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: 'Wrong Password' });
        }

        return done(null, user, { message: 'Logged in Successfully' });
      } catch (error) {
        return done(error);
      }
    }
  )
);

module.exports = router;
