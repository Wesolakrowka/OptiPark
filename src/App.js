import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ModalProvider } from './context/ModalContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import LoginModal from './components/LoginModal';
import DashboardAdmin from './components/DashboardAdmin';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = true;
  return isAuthenticated ? children : <Navigate to="/" />;
};

const App = () => {
  return (
    <Router>
      <ModalProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard_admin"
            element={
              <PrivateRoute>
                <DashboardAdmin />
              </PrivateRoute>
            }
          />
        </Routes>
        <LoginModal />
      </ModalProvider>
    </Router>
  );
};

export default App;