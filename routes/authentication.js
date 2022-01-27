var express = require("express");
var router = express.Router();
const pool = require("../database");
const passport = require("passport");

const { isLoggedIn } = require("../lib/protect");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("AUTHENTICATION!");
});

/****************** RUTAS PARA REGISTRO ******************/

router.get("/signup", function (req, res, next) {
  res.render("auth/signup");
});

router.post(
  "/signup",
  passport.authenticate("local.signup", {
    successRedirect: "/authentication/profile",
    failureRedirect: "/authentication/signup",
    failureFlash: true,
  })
);

/****************** RUTAS PARA LOGIN ******************/

router.get("/signin", function (req, res, next) {
  res.render("auth/signin");
});

router.post("/signin", (req, res, next) => {
  passport.authenticate("local.signin", {
    successRedirect: "/authentication/profile",
    failureRedirect: "/authentication/signin",
    failureFlash: true,
  })(req, res, next);
});

/****************** RUTAS PERFIL ******************/

router.get("/profile", isLoggedIn, function (req, res) {
  res.render("profile");
});

/****************** RUTAS LOGOUT ******************/

router.get("/logout", (req, res) => {
  req.logOut();

  res.redirect("/authentication/signin");
});

module.exports = router;
