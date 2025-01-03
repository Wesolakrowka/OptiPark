import React from 'react';
import { useModal } from '../context/ModalContext';
import Auth from '../Auth'; // Ensure the correct path to Auth component
import './LoginModal.css';

const LoginModal = () => {
  const { isModalOpen, closeModal } = useModal();

  if (!isModalOpen) return null;

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={closeModal}>X</button>
        <Auth />
      </div>
    </div>
  );
};

export default LoginModal;