var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.send("Esto sería la página de")
  // res.render('index', { title: 'Express' });
});

module.exports = router;
