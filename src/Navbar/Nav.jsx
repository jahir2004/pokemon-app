import { Link } from 'react-router-dom';
import './Nav.css';
import logo from './Pokemon-Logo-PNG-Pic.png'; 

function Nav() {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Pokémon Logo" className="logo-img" />
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/list">Lijst</Link></li>
        <li><Link to="/teams">Teams</Link></li>
      </ul>
    </nav>
  );
}

export default Nav;
