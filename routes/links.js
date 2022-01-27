var express = require("express");
var router = express.Router();
const pool = require("../database");

const { isLoggedIn, isNotLoggedIn } = require("../lib/protect");

/******************* E D I T A D O    D E      L I N K S *******************/
router.get("/add", isLoggedIn, function (req, res, next) {
  res.render("links/add");
});

/******************* A Ñ A D I R   L I N K S *******************/
router.post("/add", isLoggedIn, async function (req, res, next) {
  const { title, url, description } = req.body;

  const newLink = {
    title,
    url,
    description,
  };

  await pool.query("INSERT INTO links SET ?", [newLink]);
  req.flash("success", "El link se ha guardado correctamente");
  res.redirect("/links");
});

/******************* B O R R A D O    D E      L I N K S *******************/
router.get("/delete/:id", isLoggedIn, async function (req, res, next) {
  const { id } = req.params;

  await pool.query("DELETE FROM links WHERE id=?;", [id]);
  req.flash("success", "El link se ha borrado correctamente");

  res.redirect("/links");
});

/* LISTAR TODOS LOS LINKS */
router.get("/", isLoggedIn, async function (req, res, next) {
  const links = await pool.query("SELECT * FROM links");
  res.render("links/list", { links });
});

/******************* E D I T A D O    D E      L I N K S *******************/
router.get("/edit/:id", isLoggedIn, async function (req, res, next) {
  const { id } = req.params;

  const links = await pool.query("SELECT * FROM links WHERE id=?;", [id]);

  res.render("links/edit", links[0]);
});

router.post("/edit/:id", isLoggedIn, async function (req, res, next) {
  const { id } = req.params;
  const { title, url, description } = req.body;

  const newLink = {
    title,
    url,
    description,
  };

  await pool.query(`UPDATE links SET ? WHERE id=?`, [newLink, id]);
  req.flash("success", "El link se ha actualizado correctamente");
  res.redirect("/links");
});





module.exports = router;
