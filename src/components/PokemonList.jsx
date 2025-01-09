"use client";

import React, { useEffect, useState } from 'react';
import PokemonCard from './PokemonCard';

const PokemonList = () => {
  const [pokemon, setPokemon] = useState([]);
  const [searchByName, setSearchByName] = useState('');
  const [selectedByType, setSelectedByType] = useState('');
  const [types, setTypes] = useState([]);
  const [limit, setLimit] = useState(50);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchTypes();
  }, []);

  useEffect(() => {
    fetchPokemon();
  }, [limit]);

  const fetchPokemon = async () => {
    const response = await fetch(
      `https://nestjs-pokedex-api.vercel.app/pokemons?limit=${limit}`
    );
    const data = await response.json();
    setPokemon(data);
  };

  const fetchTypes = async () => {
    try {
      const response = await fetch('https://nestjs-pokedex-api.vercel.app/types');
      const data = await response.json();
      setTypes(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des types :', error);
    }
  };

  const handleSelect = (type) => {
    setSelectedByType(type.name);
    setIsOpen(false);
  };

  const filteredPokemon = pokemon.filter((p) => {
    const searchResult = p.name.toLowerCase().includes(searchByName.toLowerCase());
    const selectedResult =
      selectedByType === '' || p.types.some((type) => type.name === selectedByType);
    return searchResult && selectedResult;
  });

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        !loading
      ) {
        setLimit((prevLimit) => prevLimit + limit);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-4 mb-8">
        <input
          type="text"
          placeholder="Search Pokémon..."
          onChange={(e) => setSearchByName(e.target.value)}
          className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 py-2 border rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {selectedByType || 'Filtrer par type'}
          </button>

          {isOpen && (
            <ul className="absolute mt-2 bg-white border rounded-md shadow-lg w-48">
              <li
                onClick={() => handleSelect({ name: '' })}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                All Types
              </li>
              {types.map((type) => (
                <li
                  key={type.id}
                  onClick={() => handleSelect(type)}
                  className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
                >
                  <img src={type.image} alt={type.name} className="w-6 h-6" />
                  {type.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <select
  value={limit || ""}
  onChange={(e) => setLimit(Number(e.target.value))}
  className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  <option value="" disabled>
    Limite
  </option>
  <option value="10">10</option>
  <option value="20">20</option>
  <option value="50">50</option>
  <option value="100">100</option>
</select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {filteredPokemon.map((p) => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </div>

      {loading && <p>Chargement de plus Pokémons...</p>}
    </div>
  );
};

export default PokemonList;
