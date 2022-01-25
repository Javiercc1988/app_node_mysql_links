const passport = require("passport");
// Strategy es para generar instancias en modo local
const localStrategy = require("passport-local").Strategy;
const pool = require("../database");
const helpers = require("../lib/helpers");

passport.use(
  "local.signup",
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const { fullname, email } = req.body;

      const newUser = {
        fullname,
        username,
        email,
        password,
      };

      newUser.password = await helpers.encryptPassword(password);

      const result = await pool.query("INSERT INTO users SET ?", [newUser]);

      console.log(result)
    }
  )
);

passport.serializeUser((usr, done) => {});
