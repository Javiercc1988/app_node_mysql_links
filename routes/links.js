var express = require("express");
var router = express.Router();
const pool = require("../database");

const { isLoggedIn, isNotLoggedIn } = require("../lib/protect");

/* LISTAR TODOS LOS LINKS */
router.get("/", isLoggedIn, async function (req, res, next) {
  const { id } = req.user;

  const links = await pool.query("SELECT * FROM links WHERE user_id = ?", [id]);
  res.render("links/list", { links });
});

/******************* E D I T A D O    D E      L I N K S *******************/
router.get("/add", isLoggedIn, function (req, res, next) {
  res.render("links/add");
});

/******************* A Ñ A D I R   L I N K S *******************/
router.post("/add", isLoggedIn, async function (req, res, next) {
  const { title, url, description } = req.body;
  const { id } = req.user;
  user_id = id;

  const newLink = {
    title,
    url,
    user_id,
    description,
  };

  await pool.query("INSERT INTO links SET ?", [newLink]);
  req.flash("success", "El link se ha guardado correctamente");
  res.redirect("/links");
});

/******************* B O R R A D O    D E      L I N K S *******************/
router.get("/delete/:id", isLoggedIn, async function (req, res, next) {

  const { id } = req.params;

  const id_usuario = req.user.id;
  console.log(id_usuario)

  const user_id = await pool.query("SELECT user_id FROM links WHERE id = ?;", [id]);
  console.log(user_id[0].user_id)

  if (user_id[0].user_id === id_usuario) {

    await pool.query("DELETE FROM links WHERE id=?;", [id]);
    req.flash("success", "El link se ha borrado correctamente");
    res.redirect("/links");

  } else {

    req.flash("errorlog", "Ese link no pertenece a tu usuario");
    res.redirect("/profile");
    
  }
  
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
