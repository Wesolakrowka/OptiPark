import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ModalProvider } from './context/ModalContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import LoginModal from './components/LoginModal';

const App = () => {
  return (
    <Router>
      <ModalProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <LoginModal />
      </ModalProvider>
    </Router>
  );
};

export default App;