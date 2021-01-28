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
          db.query('INSERT INTO users (username, password, firstname, surname, role_id) VALUES ($1,$2,$3,$4,$5)', [req.body.email, pwHashed, req.body.firstname, req.body.surname, req.body.role_id])
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
            const error = new Error('An error occurred.', err);
            return res.status(409).json({ error: "Unauthorised" })
          }
          const userObj = { id: user.id, username: user.username, role_id: user.role_id }
          const token = jwt.sign({ user: user }, 'TOP_SECRET');
          console.log(token)
          return res.json({ userObj, token })
        } catch (error) {
          return next(error);
        }
      })(req, res, next);
  }
);


passport.use(
  'login',
  new LocalStrategy(
    {
      session: false,
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        db.query('SELECT * FROM users WHERE username = $1', [email], (err, result) => {
          console.log(result)
          if (result.rows.length == 0) {
            return done(null, false, { message: 'User not found' });
          } else {
            var user = result.rows[0]
            bcrypt.compare(password, user.password).then(validation => {
              if (!validation) {
                console.log(validation)
                return done(null, false, { message: 'Wrong Password' });
              }
              console.log(user)
              return done(null, user, { message: 'Logged in Successfully' });
            })
          }
         })
      } catch (error) {
        return done(error);
      }
    }
  )
);



module.exports = router;
