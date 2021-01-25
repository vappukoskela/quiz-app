// SLACK ESIMERKKI


const bcrypt = require('bcrypt')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
// const User = require("./models/User")
JWTstrategy = require('passport-jwt').Strategy
ExtractJWT = require('passport-jwt').ExtractJwt;
const BCRYPT_SALT_ROUNDS = 12;

passport.use(
  'register',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false
    },
    (username, password, done) => {
      try {
        console.log("Tänne ei koskaan tulla!")
        User.findOne({
          where: {
            email: username,
          },
        }).then(user => {
          if (user != null) {
            console.log('username already taken');
            return done(null, false, { message: 'username already taken' });
          } else {
            bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
              User.create({ username, password: hashedPassword }).then(user => {
                console.log('user created');
                // note the return needed with passport local - remove this return for passport JWT to work
                return done(null, user);
              });
            });
          }
        });
      } catch (err) {
        done(err);
      }
    },
  ),
);
passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false
    },
    (username, password, done) => {
      try {
        console.log("täällä ollaan ja katotaan löytyykö käyttäjä")
        // User.findOne({
        //   where: {
        //     email: username,
        //   },
        // }).then(user => {
        //   if (user === null) {
        //     return done(null, false, { message: 'bad username' });
        //   } else {
        //     bcrypt.compare(password, user.password).then(response => {
        //       if (response !== true) {
        //         console.log('passwords do not match');
        //         return done(null, false, { message: 'passwords do not match' });
        //       }
        //       console.log('user found!');
        //       //console.log(user);
        //       // note the return needed with passport local - remove this return for passport JWT
        //       return done(null, user);
        //     });
        //   }
        // });
      } catch (err) {
        done(err);
      }
    },
  ),
);
const opts = {
  //    jwtFromRequest: ExtractJWT.fromHeader('authorization'),
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  //    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
  // secretOrKey: jwtSecret.secret || 'Koira1543'
  secretOrKey: 'Koira1543'
}

passport.use(
  new JWTstrategy(opts, (jwt_payload, done) => {
    try {
      //console.log(jwt_payload)
      console.log("täällä ollaan")
      User.findOne({
        where: {
          email: jwt_payload.email,
        },
      }).then(user => {
        if (user) {
          console.log('user found in db in passport');
          // note the return removed with passport JWT - add this return for passport local
          done(null, user);
        } else {
          console.log('user not found in db');
          done(null, false);
        }
      });
    } catch (err) {
      done(err);
    }
  }),
)