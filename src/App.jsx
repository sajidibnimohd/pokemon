import React, { useState, useEffect } from "react";
import PokemonCard from "./components/PokemonCard";
import SearchBar from "./components/SearchBar";
import Loading from "./components/Loading";
import Error from "./components/Error";
import "./App.css";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
        const data = await response.json();
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return await res.json();
          })
        );
        setPokemons(pokemonDetails);
        setFilteredPokemons(pokemonDetails);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pokemons:", error);
        setError(true);
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  useEffect(() => {
    let tempPokemons = pokemons;

    if (searchTerm) {
      tempPokemons = tempPokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType) {
      tempPokemons = tempPokemons.filter((pokemon) =>
        pokemon.types.some((type) => type.type.name === filterType)
      );
    }

    setFilteredPokemons(tempPokemons);
  }, [searchTerm, filterType, pokemons]);

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <div className="App">
      <header>
        <h1>Pokémon Explorer</h1>
      </header>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterType={filterType}
        setFilterType={setFilterType}
      />
      <div className="pokemon-list">
        {filteredPokemons.length > 0 ? (
          filteredPokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))
        ) : (
          <p className="no-results">No Pokémon found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
