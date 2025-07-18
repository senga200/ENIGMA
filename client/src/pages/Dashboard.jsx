function Dashboard() {
  return (
    <div className="container">
      <h1>📊 Tableau de bord</h1>
      <p>Bienvenue sur votre tableau de bord !</p>
           <section>
        <h2>📈 Tes statistiques</h2>
        <p>Nombre d'énigmes résolues : 42</p>
        <p>Temps moyen de résolution : 5 minutes</p>
        <p>Taux de réussite : 85%</p>
        <p>Dernière énigme résolue : 2 jours</p>
        <p>Meilleure performance : 1 minute</p>
      </section>

      <section>
        <h2>⭐ Enigmes favorites</h2>
        <p>Tu n'as pas encore d'énigmes favorites.</p>
        <p>Découvre les énigmes du jour et ajoute-les à tes favorites !</p>
      </section>

      <section>
        <h2>📜 Historique</h2>
        <p>Tu n'as pas encore d'historique d'énigmes résolues.</p>
        <p>Commence à résoudre des énigmes pour voir ton historique ici.</p>
      </section>

      <section>
        <h2>🏆 Classement</h2>
        <p>Tu n'es pas encore classé.</p>
        <p>Résous des énigmes pour grimper dans le classement !</p>
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