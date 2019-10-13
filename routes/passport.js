const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const userModel = require("../model/user");
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    function(email, password, cb) {
      return userModel
        .vailidPassWord(email, password)
        .then(user => {
          if (!user) {
            return cb(null, false, {
              message: "Incorrect email or pass word."
            });
          }
          return cb(null, user, { message: "Logged in successfully" });
        })
        .catch(err => cb(err));
    }
  )
);
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "queocuteahihi"
    },
    (jwtPayload, cb) => {
      return userModel
        .findOneById(jwtPayload.id)
        .then(user => {
          return cb(null, user);
        })
        .catch(err => {
          return cb(err);
        });
    }
  )
);

