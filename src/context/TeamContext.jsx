import { createContext, useContext, useEffect, useState } from "react";

const TeamContext = createContext();

export function TeamProvider({ children }) {
  const [teams, setTeams] = useState(() => {
    try { return JSON.parse(localStorage.getItem("teams") || "[]"); } catch { return []; }
  });

  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem("favorites") || "[]"); } catch { return []; }
  });

  useEffect(() => { localStorage.setItem("teams", JSON.stringify(teams)); }, [teams]);
  useEffect(() => { localStorage.setItem("favorites", JSON.stringify(favorites)); }, [favorites]);

  function createTeam(name) {
    const id = Date.now();
    setTeams(s => [...s, { id, name, pokemons: [] }]);
    return id;
  }

  function deleteTeam(id) {
    setTeams(s => s.filter(t => t.id !== id));
  }

  function addPokemonToTeam(teamId, pokemon) {
    setTeams(s =>
      s.map(t =>
        t.id === teamId
          ? { ...t, pokemons: [...t.pokemons.filter(p => p.id !== pokemon.id), pokemon] }
          : t
      )
    );
  }

  function removePokemonFromTeam(teamId, pokemonId) {
    setTeams(s =>
      s.map(t => (t.id === teamId ? { ...t, pokemons: t.pokemons.filter(p => p.id !== pokemonId) } : t))
    );
  }

  function toggleFavorite(pokemonId) {
    setFavorites(s => (s.includes(pokemonId) ? s.filter(id => id !== pokemonId) : [...s, pokemonId]));
  }

  return (
    <TeamContext.Provider
      value={{
        teams,
        favorites,
        createTeam,
        deleteTeam,
        addPokemonToTeam,
        removePokemonFromTeam,
        toggleFavorite,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
}

export function useTeams() {
  return useContext(TeamContext);
}