"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

const PokemonCard = ({ pokemon }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/pokemon/${pokemon.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white shadow-md rounded-lg p-4 text-center hover:scale-105 transition-transform duration-200 cursor-pointer"
    >
      <img
        src={pokemon.image}
        alt={pokemon.name}
        className="w-32 h-32 mx-auto mb-4"
      />
      <h3 className="text-lg font-bold">{pokemon.name}</h3>
      <p className="text-gray-600"># {pokemon.pokedexId}</p>
      <div className="flex justify-center mt-4 gap-2">
        {pokemon.types.map((type) => (
          <img
            key={type.id}
            src={type.image}
            alt={type.name}
            className="w-8 h-8"
            title={type.name}
          />
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
