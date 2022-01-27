const passport = require("passport");
// Strategy es para generar instancias en modo local
const localStrategy = require("passport-local").Strategy;
const pool = require("../database");
const helpers = require("../lib/helpers");


/***************** LOGIN *****************/

passport.use(
  "local.signin",
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {

      const result = await pool.query("SELECT * INTO users WHERE username = ?", [username]);

      if (rows.length >0) {

      } else {
        return done(null, false, req.flash("El usuario NO existe!"))
      }
    }
  )
);

/***************** REGISTRO *****************/
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

      newUser.id = result.insertId;
      return done(null, newUser);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
  done(null, rows[0]);
});
