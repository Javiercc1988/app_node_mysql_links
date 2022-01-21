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

router.get("/profile", function (req, res, next) {
  res.send("PROFILE");
});

router.post("/signup", async function (req, res, next) {
  passport.authenticate("local.signup", {
    successRedirect: "/profile",
    failureRedirect: "/authentication/signup",
    failureFlash: true,
  });
  console.log(req.body)
  res.send("usuario registrado")
  // const { username, password, email, fullname } = req.body;
  // const newUser = {
  //   fullname,
  //   username,
  //   email,
  //   password,
  // };

  // await pool.query("INSERT INTO users SET ?", [newUser]);
  // res.redirect("auth/signup");
});

module.exports = router;
