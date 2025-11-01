import { Link } from "react-router-dom";
import "./home.css";
import PokemonList from "../Data/pocket";

function Home() {
  return (
    <div className="home-container">
  <header className="home-header">
    <h1 className="home-title">Welkom bij de Pokémon Wereld</h1>
    <p className="home-subtitle">Ontdek, verzamel en leer alles over je favoriete Pokémon!</p>
  </header>

  <section className="home-section">
    <h2>Wat is deze app?</h2>
    <p>Deze applicatie gebruikt de PokéAPI om een interactieve lijst van Pokémon te tonen.</p>
  </section>

  <section className="home-section">
    <h2>Wat kun je doen?</h2>
    <ul>
      <li>📜 Bekijk een lijst van Pokémon</li>
      <li>🔍 Klik op een Pokémon voor details</li>
      <li>🎓 Leer over types, xp en Gewicht</li>
    </ul>
    <Link to="/list" className="home-button">Bekijk de Pokémon →</Link>
  </section>

  <footer className="home-footer">
    <p>&copy; 2025 Pokémon App. Gebouwd met liefde voor trainers wereldwijd.</p>
  </footer>
</div>

  );
}

export default Home;

