
import EnigmeDuJour from '../components/EnigmeDuJour';
import EnigmeDeHier from '../components/EnigmeDeHier';
import NavBar from '../components/NavBar';

import React, { useEffect, useState } from 'react';
import '../styles/Home.css'; 
import '../styles/Background.css'; 

function Home() {
    const [isSwitched, setIsSwitched] = useState(false);
    useEffect(() => {
    if (isSwitched) {
      document.documentElement.style.setProperty('--stripe-color', '#000');
    } else {
      document.documentElement.style.setProperty('--stripe-color', '#fff');
    }
  }, [isSwitched]);

  const handleToggle = () => {
    setIsSwitched(!isSwitched);
  };

 return (
    <>
      {/* Background en fixed derrière */}
      <section className="wrapper">
        <div className="hero"></div>
      </section>

      {/* Contenu principal */}
      <div className="container">
        <NavBar />
        <h1>🧩 Bienvenue sur Enigma</h1>

        {/* Le switch pour changer le bg */}
        <div className="content-switch">
          <input
            type="checkbox"
            id="switch"
            checked={isSwitched}
            onChange={handleToggle}
          />
          <label htmlFor="switch">
            <span>
              <span className="icon">→</span> switch bg
            </span>
          </label>
        </div>

        <section>
          <h2>🧠 Énigme du jour</h2>
          <div className="enigme-container">
            <EnigmeDuJour />
          </div>
          <div className="enigme-yesterday">
            <h3>🔮 Énigme d'hier</h3>
            <EnigmeDeHier />
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;