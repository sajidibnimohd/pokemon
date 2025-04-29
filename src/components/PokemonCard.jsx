import React from "react";
import "./PokemonCard.css";

function PokemonCard({ pokemon }) {
  return (
    <div className="pokemon-card">
      <h2>#{pokemon.id} {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
      />
      <div className="types">
        {pokemon.types.map((typeInfo) => (
          <span key={typeInfo.slot} className={`type ${typeInfo.type.name}`}>
            {typeInfo.type.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default PokemonCard;
