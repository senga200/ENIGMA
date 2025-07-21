function Dashboard() {
  return (
    <div className="container">

      <section>
        <h2>⭐ Enigmes favorites</h2>
        <p>Tu n'as pas encore d'énigmes favorites.</p>
        <p>Découvre les énigmes du jour et ajoute-les à tes favorites !</p>
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
import React from 'react';