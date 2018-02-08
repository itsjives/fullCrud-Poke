var express = require('express');
var router = express.Router();
var knex = require('../db/knex.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/pokemon');
});

module.exports = router;
