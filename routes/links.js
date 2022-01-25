var express = require("express");
var router = express.Router();
const pool = require("../database");

/* GET home page. */
router.get("/add", function (req, res, next) {
  res.render("links/add");
});

/* AÑADIR LINK A NUESTRA LISTA */
router.post("/add", async function (req, res, next) {
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

/* BORRAR LINK */
router.get("/delete/:id", async function (req, res, next) {
  const { id } = req.params;

  await pool.query("DELETE FROM links WHERE id=?;", [id]);
  req.flash("success", "El link se ha borrado correctamente");

  res.redirect("/links");
});

/* LISTAR TODOS LOS LINKS */
router.get("/", async function (req, res, next) {
  const links = await pool.query("SELECT * FROM links");
  res.render("links/list", { links });
});

/* EDITAR LINK A NUESTRA LISTA */
router.get("/edit/:id", async function (req, res, next) {
  const { id } = req.params;

  const links = await pool.query("SELECT * FROM links WHERE id=?;", [id]);
  
  res.render("links/edit", links[0]);
});

router.post("/edit/:id", async function (req, res, next) {
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
