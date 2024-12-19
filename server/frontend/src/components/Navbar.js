import React from 'react';
import './Navbar.css';

const Navbar = () => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <a onClick={() => scrollToSection('home')} href="#home">OPTIPARK</a>
      </div>
      <div className="menu">
        <a onClick={() => scrollToSection('home')} href="#home">Home</a>
        <a onClick={() => scrollToSection('about')} href="#about">About Us</a>
        <a onClick={() => scrollToSection('services')} href="#services">Services</a>
        <a onClick={() => scrollToSection('contact')} href="#contact">Contact Us</a>
        <button className="login-button">Login / Register</button>
      </div>
    </nav>
  );
};

export default Navbar;
