import React from 'react';
import { useModal } from '../context/ModalContext';
import './Navbar.css';

const Navbar = () => {
  const { openModal } = useModal();

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <h1>OPTIPARK</h1>
      </div>
      <div className="menu">
        <a onClick={() => scrollToSection('home')} href="#home">Home</a>
        <a onClick={() => scrollToSection('about')} href="#about">About Us</a>
        <a onClick={() => scrollToSection('services')} href="#services">Services</a>
        <a onClick={() => scrollToSection('contact')} href="#contact">Contact Us</a>
        <button onClick={openModal} className="login-button">Login / Register</button>
      </div>
    </nav>
  );
};

export default Navbar;
