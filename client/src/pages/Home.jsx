
import React from 'react';
import EnigmeDuJour from '../components/EnigmeDuJour';



function Home() {

  return (
     <div className="container">
      <h1>🧩 Bienvenue sur Enigma</h1>

      <section>
        <h2>🧠 Énigme du jour</h2>
        <EnigmeDuJour />
      </section>
    </div>
  )
}

export default Home;