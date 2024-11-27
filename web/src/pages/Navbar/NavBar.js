import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>Antiq</h1>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/floating-trays">Floating Trays</Link></li>
        <li>
          <Link to="/lighting">Lighting</Link>
          <ul className="dropdown">
            <li><Link to="/lighting/option1">Option 1</Link></li>
            <li><Link to="/lighting/option2">Option 2</Link></li>
          </ul>
        </li>
        <li>
          <Link to="/storage">Storage</Link>
          <ul className="dropdown">
            <li><Link to="/storage/option1">Option 1</Link></li>
            <li><Link to="/storage/option2">Option 2</Link></li>
          </ul>
        </li>
        <li><Link to="/sculptures-art">Sculptures & Art</Link></li>
        <li>
          <Link to="/homeware">Homeware</Link>
          <ul className="dropdown">
            <li><Link to="/homeware/option1">Option 1</Link></li>
            <li><Link to="/homeware/option2">Option 2</Link></li>
          </ul>
        </li>
        <li>
          <Link to="/antiques-vintage">Antiques and Vintage</Link>
          <ul className="dropdown">
            <li><Link to="/antiques-vintage/option1">Option 1</Link></li>
            <li><Link to="/antiques-vintage/option2">Option 2</Link></li>
          </ul>
        </li>
        <li><Link to="/festive-hampers">Festive Hampers</Link></li>
        <li><Link to="/about">About Us</Link></li>
      </ul>
      <div className="navbar-icons">
        <span className="icon search-icon">🔍</span>
        <span className="icon favorite-icon">⭐</span>
        {/* Wrap cart icon with Link */}
        <Link to="/cart">
          <span className="icon cart-icon">🛒</span>
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
