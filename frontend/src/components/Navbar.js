import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h2>📦 Inventario App</h2>
        </div>
        
        <div className="navbar-menu">
          <span className="user-info">
            Bienvenido, <strong>{user?.username}</strong>
          </span>
          <button 
            className="btn-logout"
            onClick={handleLogout}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
