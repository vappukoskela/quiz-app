const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

passport.use(
    'register',
    new localStrategy(
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
        //   const user = await UserModel.create({ email, password });
        //
          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
  