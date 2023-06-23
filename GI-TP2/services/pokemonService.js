const API_BASE_URL = 'https://pokeapi.co/api/v2';

const pokemonService = {
  getTypes: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/type`);
      const data = await response.json();
      return data.results.map((type) => type.name);
    } catch (error) {
      console.error('Error while fetching types:', error);
      return [];
    }
  },

  
  getPokemonList: async (type = '', offset = 0, limit = 20) => {
    if (type){
      try {
        const response = await fetch(`${API_BASE_URL}/type/${type}`);
        const data = await response.json();
        console.log(response) 
        return data.pokemon.slice(offset, offset+limit).map((pokemon) => ({
          id: pokemon.pokemon.id,
          name: pokemon.pokemon.name,
        }));
      } catch (error) {
        console.error('Error while fetching Pokémon list:', error);
        return [];
      }  
    }
    else {
    try {
      const response = await fetch(`${API_BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);
      const data = await response.json();
      console.log(response)
      return data.results.map((pokemon) => ({
        id: pokemon.id,
        name: pokemon.name,
      }));
    } catch (error) {
      console.error('Error while fetching Pokémon list:', error);
      return [];
    }
  }
  },

  searchPokemonByName: async (name) => {
    try {
      const response = await fetch(`${API_BASE_URL}/pokemon/${name}`);
      const data = await response.json();
      return {
        id: data.id,
        name: data.name,
      };
    } catch (error) {
      console.error('Error while searching Pokémon by name:', error);
      return null;
    }
  },
};

export default pokemonService;