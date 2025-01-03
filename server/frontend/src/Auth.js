import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importujemy useNavigate
import axios from 'axios';
import './Auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate(); // Inicjalizacja useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      // Logowanie
      try {
        const response = await axios.post('http://localhost:3000/api/users/login', {
          u_email: email,
          u_password: password,
        });
        console.log(response.data);
        alert('Login successful');

        // Przekierowanie na Dashboard
        navigate('/dashboard_admin');
      } catch (error) {
        console.error(error);
        alert('Error logging in');
      }
    } else {
      // Rejestracja
      try {
        const response = await axios.post('http://localhost:3000/api/users/register', {
          u_nome: name,
          u_email: email,
          u_password: password,
          u_role: role,
        });
        console.log(response.data);
        alert('Registration successful');
        setIsLogin(true); // Przełącz na ekran logowania po rejestracji
      } catch (error) {
        console.error(error);
        alert('Error registering');
      }
    }
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">{isLogin ? 'Login' : 'Registration'}</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        {!isLogin && (
          <div className="input-group">
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
        )}
        <div className="input-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {!isLogin && (
          <div className="input-group">
            <label>Role:</label>
            <input type="text" value={role} onChange={(e) => setRole(e.target.value)} required />
          </div>
        )}
        <button type="submit" className="submit-button">
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      <div className="toggle-section">
        <p>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button
            type="button"
            className="toggle-button"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Register here' : 'Login here'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
