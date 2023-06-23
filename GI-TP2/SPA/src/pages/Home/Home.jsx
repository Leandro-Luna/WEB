import React, { useState, useEffect } from 'react';
import pokemonService from '../../../../services/pokemonService'

const Home = () => {
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Fetch the list of types from the pokemonService
    const fetchTypes = async () => {
      const types = await pokemonService.getTypes();
      setTypes(types);
    };

    fetchTypes();
  }, []);

  useEffect(() => {
    // Fetch the Pokémon list based on the selected type and current page
    const fetchPokemonList = async () => {
      const offset = (currentPage - 1) * 20;
      const limit = 20;
      const pokemon = await pokemonService.getPokemonList(selectedType, offset, limit);
      console.log(pokemon)

      setPokemonList(pokemon);
      console.log(pokemonList)
    };

    fetchPokemonList();
  }, [selectedType, currentPage]);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    console.log(event.target.value);
    setCurrentPage(1); // Reset current page when type is changed
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <h1>Pokémon App</h1>

      <label htmlFor="type">Select a type:</label>
      <select id="type" value={selectedType} onChange={(e) => handleTypeChange(e)}>
        <option value="">All</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <h2>Pokémon List</h2>
      <ul>
        {pokemonList.map((pokemon) => (
          <li key={pokemon.id}>{pokemon.name}</li>
        ))}
      </ul>

      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={pokemonList.length < 20}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
