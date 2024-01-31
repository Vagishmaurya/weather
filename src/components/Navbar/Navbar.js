import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">Weather App</div>
      <button className="toggle-btn" onClick={toggleMenu}>
        {isOpen ? 'Close' : 'Menu'}
      </button>
      <div className={`menu ${isOpen ? 'open' : ''}`}>
        <a href="/">Home</a>
        <a href="/">Forecast</a>
        <a href="/">About</a>
      </div>
    </nav>
  );
};

export default Navbar;
