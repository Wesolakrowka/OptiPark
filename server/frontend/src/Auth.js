import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importujemy useNavigate
import axios from 'axios';
import './Auth.css';
import {useModal} from './context/ModalContext'

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Inicjalizacja useNavigate
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/users/login', {
        u_email: email,
        u_password: password,
      });
      console.log(response.data);
      closeModal();
      // alert('Login successful');

      // Przekierowanie na Dashboard
      navigate('/dashboard_admin');
    } catch (error) {
      console.error(error);
      alert('Error logging in');
    }
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">Login</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="input-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="submit-button">Login</button>
      </form>
    </div>
  );
};

export default Auth;
