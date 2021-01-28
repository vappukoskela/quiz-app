const express = require('express');
const router = express.Router();
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

router.get(
  '/profile',
  (req, res, next) => {
    res.json({
      message: 'You made it to the secure route',
      user: req.user,
      token: req.query.secret_token
    })
  }
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: 'TOP_SECRET',
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
    },
    async (token, done) => {
      console.log("hello world")
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);



//https://www.digitalocean.com/community/tutorials/api-authentication-with-json-web-tokensjwt-and-passport#step-7-%E2%80%94-creating-secure-routes
// TÄNNE KAIKKI ADMIN UTILS ESIM KYSYMYKSEN LUONTI JNE "OPETTAJAMODE"

module.exports = router;
