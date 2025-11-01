import { createContext, useContext, useState, useEffect } from "react";

const PokemonContext = createContext();

export function PokemonProvider({ children }) {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchAllDetails() {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
        const data = await res.json();

        const detailedData = await Promise.all(
          data.results.map(async (p) => {
            const res = await fetch(p.url);
            return await res.json();
          })
        );

        setPokemons(detailedData);
        setLoading(false);
      } catch (err) {
        console.error("Fout bij ophalen van Pokémon:", err);
        setError(true);
      }
    }

    fetchAllDetails();
  }, []);

  return (
    <PokemonContext.Provider value={{ pokemons, loading, error }}>
      {children}
    </PokemonContext.Provider>
  );
}

export function usePokemon() {
  return useContext(PokemonContext);
}
