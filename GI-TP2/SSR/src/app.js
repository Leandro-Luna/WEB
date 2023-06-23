const pokemonService = require('./services/pokemonService')
const express = require('express');
const app = express();
const morgan=require('morgan');

app.set('port', process.env.PORT || 3000);

app.set('view engine', 'ejs');

app.set('views', __dirname + '\\..\\views');

app.use(express.static(__dirname + "\\..\\public"))
console.log(__dirname + "\\..\\public")

async function fetchType() {
  try {
    const types = await pokemonService.getTypes();
    console.log(types);
    return types
    // Handle the types data here
  } catch (error) {
    console.error('Error while fetching types:', error);
    // Handle the error here
  }
}

async function fetchPokemon() {
  try {
    const pokemonList = await pokemonService.getPokemonList();
    console.log(pokemonList);
    return pokemonList
    // Handle the pokemonList data here
  } catch (error) {
    console.error('Error while fetching Pokémon list:', error);
    // Handle the error here
  }
}

async function buildRes() {
  return {pokemon: {
    types: await fetchType(),
    pokemon : await fetchPokemon() 
  }
}
}

app.get('/', (req, res) => {

  buildRes().then((context) => {
    res.render('index', context)
  })
})



// Start the server only if not in a testing environment
if (process.env.NODE_ENV !== 'test') {
    app.listen(app.get('port'), () => {
      console.log(`Server listening on port ${app.get('port')}`);
    });
  }

module.exports =app