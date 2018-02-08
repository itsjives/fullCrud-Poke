var express = require('express');
var router = express.Router();
var knex = require('../db/knex.js');


/* GET users listing. */
router.get('/', function(req, res, next) {
  knex.raw(`SELECT * FROM trainers`)
  .then(function(data){
    res.render('trainers/index', {trainers: data.rows});
  })
});

router.get('/:id/details', function(req, res){
  knex.raw(`SELECT pokemon.name, trainers.name as t_name FROM trainers JOIN pokemon ON trainers.id = pokemon.trainer_id WHERE trainers.id='${req.params.id}'`)
  .then(function(data){
    res.render('trainers/showTrainer', {trainer: data.rows, trainer_name: data.rows[0]})
  })
})

module.exports = router;
