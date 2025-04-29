import React from "react";
import "./SearchBar.css";

function SearchBar({ searchTerm, setSearchTerm, filterType, setFilterType }) {
  const types = [
    "", "fire", "water", "grass", "electric", "bug", "normal", "poison", "ground", "fairy", "fighting", "psychic", "rock", "ghost", "ice", "dragon"
  ];

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search Pokémon by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
      >
        <option value="">All Types</option>
        {types.map((type, index) =>
          type && <option key={index} value={type}>{type}</option>
        )}
      </select>
    </div>
  );
}

export default SearchBar;
