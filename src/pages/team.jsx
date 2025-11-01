// ...existing code...
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTeams } from "../context/TeamContext";
import "./team.css"; // ...existing code...

export default function Team() {
  const { teams, createTeam, deleteTeam } = useTeams();
  const [name, setName] = useState("");

  function handleCreate(e) {
    e.preventDefault();
    if (!name.trim()) return;
    createTeam(name.trim());
    setName("");
  }

  return (
    <div className="teams-page"> {/* { changed code } */}
      <h1>Teams</h1>

      <form onSubmit={handleCreate} className="team-form"> {/* { changed code } */}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nieuwe teamnaam"
        />
        <button type="submit" className="btn primary" style={{ marginLeft: 8 }}> {/* { changed code } */}
          Maak team
        </button>
      </form>

      {teams.length === 0 && <p>Geen teams gevonden. Maak er één of voeg een Pokémon toe vanuit de lijst.</p>}

      <div className="team-list"> {/* { changed code } */}
        {teams.map((t) => (
          <div key={t.id} className="team-card"> {/* { changed code } */}
            <h3>
              <Link to={`/teams/${t.id}`}>{t.name}</Link>
            </h3>
            <p className="team-count">Leden: {t.pokemons?.length || 0}</p>
            <div className="team-actions">
              <Link to={`/teams/${t.id}`}><button className="btn">Bekijk</button></Link>
              <button className="btn danger" onClick={() => {
                if (window.confirm(`Verwijder team ${t.name}?`)) deleteTeam(t.id);
              }}>Verwijder</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
// ...existing code...