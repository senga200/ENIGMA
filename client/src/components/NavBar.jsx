import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../utils/UserContext';
import '../styles/NavBar.css'; 

function NavBar() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/signin');
  };

  return (
    <nav className="navbar">
    <ul>
        <li><Link to="/dashboard">🏠 Dashboard</Link></li>
        {!user ? (
          <>
            <li><Link to="/signin">🔐 Connexion</Link></li>
            <li><Link to="/signup">📝 Inscription</Link></li>
          </>
        ) : (
          <>
            <li>👤 {user.username}</li>
            <li><button onClick={handleLogout}>🚪 Déconnexion</button></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
