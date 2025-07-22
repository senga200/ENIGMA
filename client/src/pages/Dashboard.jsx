
import FavorisList from "../components/FavorisList";

function Dashboard() {
  return (
    <div className="container">
      <h1>Tableau de bord</h1>
      <section>
        <h2>⭐ Enigmes favorites</h2>
        <p>Découvre les énigmes du jour et ajoute-les à tes favorites !</p>
      <FavorisList />
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
