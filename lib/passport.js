const passport = require("passport");
// Strategy es para generar instancias en modo local
const Strategy = require("passport-local").Strategy;

passport.use(
  "local.signup",
  new Strategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      console.log(req.body);
    }
  )
);

// passport.serializeUser((usr, done) => {});
