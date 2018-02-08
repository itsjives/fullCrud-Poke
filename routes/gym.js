var express = require('express');
var router = express.Router();
var knex = require('../db/knex.js');


router.get('/', function(req, res){
  var p1 = Number(req.cookies.p1);
  var p2 = Number(req.cookies.p2);
  var pokemon1;
  var pokemon2;
  knex.raw(`SELECT * from pokemon`)
  .then(function(data){
    data.rows.forEach(function(pokemon){
      if(pokemon.id === p1){
        console.log(pokemon, 'P1');
        pokemon1 = pokemon;
      } else if(pokemon.id === p2){
        console.log(pokemon, 'P2');
        pokemon2 = pokemon;
      };
    });
    res.render('gym/index', {pokemon:data.rows, pokemon1: pokemon1, pokemon2: pokemon2, p1:p1, p2:p2})
  });
});

router.get('/clear', function(req, res){
  res.clearCookie('p1');
  res.clearCookie('p2');
  res.redirect('/gym');
});



module.exports = router;
