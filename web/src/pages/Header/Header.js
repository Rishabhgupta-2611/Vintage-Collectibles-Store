import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import './Header.css';

function Header() {
  const navigate = useNavigate(); // Initialize navigate function

  // Handle click on the user icon to navigate to the login page
  const handleLoginClick = () => {
    navigate('/login'); // Navigate to the login page
  };

  const handleCartClick = () => {
    navigate('/cart'); // Navigate to the cart page
  };

  return (
    <header className="header">
      <div className="header-top">
      <img 
  src="image/jai.png" 
  alt="Timeless Treasures" 
  className="logo" 
  style={{ width: '150px', height: 'auto' }} 
/><h1 style={{ fontFamily: 'Playfair Display', fontStyle: 'italic', fontSize: '2rem', color: '#5a4233' }}>
  Timeless Treasures
</h1>
        <div className="icons">
          <span className="icon search-icon">🔍</span>
          {/* Attach the onClick handler to the user icon */}
          <span className="icon user-icon" onClick={handleLoginClick}>👤</span>
          <span className="icon favorites-icon">⭐</span>
          <span className="icon cart-icon" onClick={handleCartClick}>🛒</span>
        </div>
      </div>
      <nav className="header-bottom">
        <Link to="/">Home</Link>
        <Link to="/antiques-vintage/vintage-decor">Vintage Decor</Link>
        <Link to="/lighting">Lighting</Link>
        <Link to="/VintagePotsAndPlanters">
        Vintage Pots and Planters
      </Link>
        <Link to="/sculptures-art">Sculptures & Art</Link>
        <Link to="/vintage-furniture">Vintage Furniture</Link>
        <Link to="/festive-hampers">Festive Hampers</Link>
        <Link to="/about-us">About Us</Link> {/* Updated link to About Us */}
      </nav>
    </header>
  );
}

export default Header;
