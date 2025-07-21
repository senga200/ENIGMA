
import EnigmeDuJour from '../components/EnigmeDuJour';
import EnigmeDeHier from '../components/EnigmeDeHier';
import NavBar from '../components/NavBar';

import '../styles/Home.css'; 


function Home() {

  return (
     <div className="container">
      <NavBar />
      <h1>🧩 Bienvenue sur Enigma</h1>

      <section>
        <h2>🧠 Énigme du jour</h2>
        <div className="enigme-container">
        <EnigmeDuJour />
        </div>
        <div className='enigme-yesterday'>
          <h3>🔮 Énigme d'hier</h3>
          <EnigmeDeHier />
        
        </div>
      </section>
    </div>
  )
}

export default Home;