import { useParams, Link } from "react-router-dom";
import { usePokemon } from "../context/PokemonContext";
import "./detail.css";

function Detail() {
  const { id } = useParams();
  const { pokemons, loading, error } = usePokemon();

  if (loading) return <div className="detail-loading">⏳ Pokémon worden geladen...</div>;
  if (error) return <div className="detail-error">❌ Er is een fout opgetreden</div>;

  const pokemon = pokemons.find((p) => p.id === Number(id));
  if (!pokemon) return <div className="detail-not-found">❌ Pokémon niet gevonden</div>;

  return (
    <div>
      <h1 className="detail-title">pokememon detail</h1>
    <section className="detail-container">
      <header className="detail-header">
        <h2 className="detail-name">{pokemon.name}</h2>
        <span className="detail-id">#{pokemon.id}</span>
      </header>

      <figure className="detail-image-wrapper">
        <img
          src={pokemon.sprites?.front_default || "/fallback.png"}
          alt={pokemon.name}
          className="detail-image"
        />
        <figcaption className="detail-caption">Standaard sprite van {pokemon.name}</figcaption>
      </figure>

      <ul className="detail-info">
        <li><strong>Type:</strong> {pokemon.types?.map(t => t.type.name).join(", ") || "Onbekend"}</li>
        <li><strong>XP:</strong> {pokemon.base_experience ?? "?"}</li>
        <li><strong>Hoogte:</strong> {pokemon.height ?? "?"}</li>
        <li><strong>Gewicht:</strong> {pokemon.weight ?? "?"}</li>
      </ul>
        <Link to="/list" className="back-button">
      ⬅ Terug naar lijst
    </Link>
    </section>

    <footer className="home-footer">
      <p>&copy; 2025 Pokémon App. Gebouwd met liefde voor trainers wereldwijd.</p>
    </footer>
    </div>
  );
}

export default Detail;
