import PokemonList from "../Data/pocket";
import { Link } from "react-router-dom";
import"./list.css";
import "./team.css";

function List() {
  return (
    <div className="list-page">
      <header className="list-header">
        <h1>🧬 Pokémon Lijst</h1>
        <p>Ontdek alle Pokémon en klik voor meer details!</p>
      </header>

      <main className="list-content">
        <PokemonList />
      </main>

      <nav className="list-nav">
        <Link to="/" className="home-button">← Terug naar Home</Link>
      </nav>
      
      <footer className="list-footer">
        <p>&copy; 2025 Pokémon App. Gebouwd met liefde voor trainers wereldwijd.</p>
      </footer>
    </div>
  );
}

export default List;
