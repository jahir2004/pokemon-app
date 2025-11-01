import { useParams, Link } from "react-router-dom";
import { useTeams } from "../context/TeamContext";
import "./team.css"; // { changed code }

export default function TeamDetail() {
  const { id } = useParams();
  const { teams, removePokemonFromTeam } = useTeams();
  const team = teams.find((t) => String(t.id) === String(id));

  if (!team) return (
    <div className="teams-page">
      <p>Team niet gevonden. <Link to="/teams">Terug naar teams</Link></p>
    </div>
  );

  return (
    <div className="teams-page">
      <h1>{team.name}</h1>
      <p>{team.pokemons?.length || 0} Pokémon</p>

      {team.pokemons.length === 0 && <p>Geen Pokémon toegevoegd. Voeg er een toe via de Pokémon-lijst.</p>}

      <div className="roster">
        {team.pokemons.map((p) => (
          <div key={p.id} className="roster-card">
            <Link to={`/detail/${p.id}`}>
              <img src={p.sprite} alt={p.name} />
              <h4>{p.name.charAt(0).toUpperCase() + p.name.slice(1)}</h4>
            </Link>
            <div className="roster-actions">
              <button className="btn danger" onClick={() => {
                if (!window.confirm(`Verwijder ${p.name} uit ${team.name}?`)) return;
                removePokemonFromTeam(team.id, p.id);
              }}>Verwijder</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
       <Link to="/teams" className="back-link">← Terug naar teams</Link>
      </div>
    </div>
  );
}