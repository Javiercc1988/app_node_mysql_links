var express = require("express");
var router = express.Router();
const pool = require("../database");
const passport = require("passport");

const { isLoggedIn, isNotLoggedIn } = require("../lib/protect");
const helpers = require("../lib/helpers");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("AUTHENTICATION!");
});

/****************** RUTAS PARA REGISTRO ******************/

router.get("/signup", isNotLoggedIn, function (req, res, next) {
  res.render("auth/signup");
});

router.post(
  "/signup",
  isNotLoggedIn,
  passport.authenticate("local.signup", {
    successRedirect: "/authentication/profile",
    failureRedirect: "/authentication/signup",
    failureFlash: true,
  })
);

/****************** RUTAS PARA LOGIN ******************/

router.get("/signin", isNotLoggedIn, function (req, res, next) {
  res.render("auth/signin");
});

router.post("/signin", isNotLoggedIn, (req, res, next) => {
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

router.get("/logout", isLoggedIn, (req, res) => {
  req.logOut();

  res.redirect("/authentication/signin");
});

/****************** RUTAS PARA PASS RECOVERY ******************/

router.get("/passrecovery", isNotLoggedIn, function (req, res, next) {
  res.render("auth/passrecovery");
});

router.post("/passrecovery", isNotLoggedIn, async (req, res, next) => {
  let existe = await helpers.existeUsuario(req.body.username);
  console.log(existe);

  if (existe) {
    req.flash("success", `Mensaje enviado a su correo`);
    res.redirect("/authentication/signin");

  } else {

    req.flash("errorlog", `El usuario ${req.body.username} no existe`);
    res.redirect("/authentication/signup");
  }
});

module.exports = router;

