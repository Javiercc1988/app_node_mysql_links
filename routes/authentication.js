var express = require("express");
var router = express.Router();
const pool = require("../database");
const passport = require("passport");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("AUTHENTICATION!");
});
router.get("/profile", function (req, res, next) {
  res.send("Profile!");
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

module.exports = router;
