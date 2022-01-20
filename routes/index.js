var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.send("Esto es un texto de prueba")
  // res.render('index', { title: 'Express' });
});

module.exports = router;
