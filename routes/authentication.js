var express = require("express");
var router = express.Router();
const pool = require("../database");
const passport = require("passport");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("AUTHENTICATION!");
});

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

module.exports = router;
