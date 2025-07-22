
import FavorisList from "../components/FavorisList"; 
import React, { useEffect, useState } from 'react';
import '../styles/Dashboard.css';


function Dashboard() {
  return (
    <div className="container">
      <h1>Mes Favoris</h1>
      <section>
                  <div className="enigme-container">


        <h2>⭐ Enigmes favorites</h2>
      <FavorisList />
                  </div>
      </section>

      <section>
        <h2>📤 Partager</h2>
        <p>Partage tes énigmes préférées avec tes amis !</p>
        <p>Utilise le bouton ci-dessous pour partager l'énigme du jour.</p>
        <button onClick={() => alert('Partagez l\'énigme du jour !')}>
          Partager l'énigme du jour
        </button>
      </section>                    
    </div>
  );
}

export default Dashboard;
