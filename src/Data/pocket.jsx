import { usePokemon } from "../context/PokemonContext";
import { useTeams } from "../context/TeamContext";
import { Link } from "react-router-dom";
import "./pocket.css";
import "../pages/team.css";

// ...existing code...
function Pocket() {
  const { pokemons, loading, error } = usePokemon();
  const { teams, favorites, toggleFavorite, createTeam, addPokemonToTeam } = useTeams();

  if (loading) return <p>⏳ Pokémon worden geladen...</p>;
  if (error) return <p>❌ Fout bij ophalen van Pokémon</p>;

  function handleAddToTeam(pokemon) {
    if (teams.length === 0) {
      if (!window.confirm("Geen teams aanwezig. Nieuw team aanmaken?")) return;
      const name = window.prompt("Naam nieuw team:");
      if (!name) return;
      const id = createTeam(name);
      addPokemonToTeam(id, { id: pokemon.id, name: pokemon.name, sprite: pokemon.sprites.front_default });
      alert(`${pokemon.name} toegevoegd aan ${name}`);
      return;
    }

    if (teams.length === 1) {
      addPokemonToTeam(teams[0].id, { id: pokemon.id, name: pokemon.name, sprite: pokemon.sprites.front_default });
      alert(`${pokemon.name} toegevoegd aan ${teams[0].name}`);
      return;
    }

    const choice = window.prompt(
      "Voer teamnaam in om toe te voegen:\n" + teams.map(t => t.name).join(", ")
    );
    if (!choice) return;
    const team = teams.find(t => t.name.toLowerCase() === choice.toLowerCase());
    if (!team) {
      alert("Team niet gevonden");
      return;
    }
    addPokemonToTeam(team.id, { id: pokemon.id, name: pokemon.name, sprite: pokemon.sprites.front_default });
    alert(`${pokemon.name} toegevoegd aan ${team.name}`);
  }

  return (
    <div className="pokemon-grid">
      {pokemons.map((pokemon) => (
        <div key={pokemon.id} className="pokemon-card">
          <Link to={`/detail/${pokemon.id}`}>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
          </Link>

          <div style={{ marginTop: 8 }}>
            <button onClick={() => toggleFavorite(pokemon.id)}>
              {favorites.includes(pokemon.id) ? "★ Favoriet" : "☆ Favoriet"}
            </button>
            <button style={{ marginLeft: 8 }} onClick={() => handleAddToTeam(pokemon)}>
              + Voeg toe aan team
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Pocket;
