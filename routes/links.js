var express = require('express');
var router = express.Router();
const pool = require("../database")


/* GET home page. */
router.get('/add', function(req, res, next) {
  res.render("links/add")
});

router.post("/add",async function(req,res,next){
  
  const {title,url,description} = req.body

  const newLink = {
    title,
    url,
    description
  }

  await pool.query("INSERT INTO links SET ?",[newLink])
  console.log(newLink)
  res.send("Received")
})

module.exports = router;
