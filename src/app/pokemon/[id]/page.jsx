"use client";

import { useEffect, useState } from 'react';

const PokemonDetails = ({ params }) => {
  const { id } = params; 
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPokemonDetails = async () => {
    try {
      const response = await fetch(`https://nestjs-pokedex-api.vercel.app/pokemons/${id}`);
      const data = await response.json();
      setPokemon(data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération du Pokémon :", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemonDetails();
  }, [id]);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (!pokemon) {
    return <p>Le Pokémon n'a pas été trouvé.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => history.back()}
        className="mb-6 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
      >
        ← Retour
      </button>

      <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-4">{pokemon.name}</h1>
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-64 h-64 mx-auto mb-4"
        />
        <div className="text-center">
          <h2 className="text-xl font-semibold">Stats</h2>
          <ul className="list-disc list-inside">
            <li>HP: {pokemon.stats.HP}</li>
            <li>Attack: {pokemon.stats.attack}</li>
            <li>Defense: {pokemon.stats.defense}</li>
            <li>Speed: {pokemon.stats.speed}</li>
            <li>Special Attack: {pokemon.stats.specialAttack}</li>
            <li>Special Defense: {pokemon.stats.specialDefense}</li>
          </ul>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-center mb-2">Évolutions</h2>
          {pokemon.evolutions.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-4">
              {pokemon.evolutions.map((evolution) => (
                <div key={evolution.pokedexId} className="text-center">
                  <p>{evolution.name}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center">Aucune évolution disponible</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
