var express = require('express');
var router = express.Router();
var knex = require('../db/knex.js');



/* GET users listing. */
router.get('/', function(req, res) {
  var p1 = Number(req.cookies.p1);
  var p2 = Number(req.cookies.p2);
  knex.raw('SELECT * FROM pokemon ORDER BY name asc')
  .then(function(data){
    res.render('pokemon/index', {pokemon: data.rows, p1:p1, p2:p2});
  });
});

router.get('/new', function(req, res){
  res.render('pokemon/createPokemon');
});


router.post('/', function(req, res){
  knex.raw(`INSERT INTO pokemon (name, cp, in_gym, trainer_id) VALUES ('${req.body.pokemon_name}','${req.body.cp}','${req.body.in_gym}','${req.body.trainer_id}')`)
  .then(function(data){
    res.redirect('/pokemon');
  });
});
router.get('/:id/details', function(req, res){
  knex.raw(`SELECT pokemon.name, pokemon.cp, pokemon.in_gym, trainers.name as t_name FROM pokemon JOIN trainers ON  trainers.id = pokemon.trainer_id WHERE pokemon.id='${req.params.id}'`)
  .then(function(data){
    res.render('pokemon/pokemondetails', {pokemon:data.rows});
  });
});

router.post('/:id/delete', function(req, res){
  knex.raw(`DELETE FROM pokemon where pokemon.id = ${req.params.id}`)
  .then(function(data){
    res.redirect('/pokemon');
  });
});


router.get('/:id/assign', function(req, res){
  knex.raw(`UPDATE pokemon SET in_gym= true WHERE id=${req.params.id}`)
  .then(function(data){
    if(!req.cookies.p1){
      res.cookie('p1', req.params.id)
    } else {
      res.cookie('p2', req.params.id)
    };
    res.redirect('/pokemon')
  });
});

router.post('/assign/:player', function(req, res){
  knex.raw(`UPDATE pokemon SET in_gym=true WHERE id=${req.body.playerid}`)
  .then(function(data){
    res.cookie(req.params.player, req.body.playerid)
    res.redirect('/gym');
  });
});

router.get('/:id/remove/:player', function(req, res){
  knex.raw(`UPDATE pokemon SET in_gym=false WHERE id=${req.params.id}`)
  .then(function(data){
    res.clearCookie(req.params.player);
    res.redirect('/pokemon');
  });
});

function Pokemon(){
  return knex('pokemon');
};

function Trainers(){
  return knex('trainers');
};


router.get('/:id/edit', function(req, res, next) {
  Pokemon().where({id:req.params.id}).then(function(pokemon){
    Trainers().select().then(function(trainers){
      res.render('pokemon/editPokemon',{pokemon:pokemon[0], trainers:trainers})
    })
  })
});

router.post('/:id/details', function(req, res, next) {
  Trainers().where({name:req.body.trainer}).then(function(trainer){
    Pokemon().update({
      name:req.body.name,
      trainer_id:Number(trainer[0].id),
      cp:Number(req.body.cp)
    }).where({id:req.params.id}).then(function(){
      res.redirect(`/pokemon/${req.params.id}/details`);
    })
  })
});


module.exports = router;
