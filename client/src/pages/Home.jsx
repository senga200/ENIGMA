
import { useUser } from '../utils/UserContext';
import EnigmeDuJour from '../components/EnigmeDuJour';
import EnigmeDeHier from '../components/EnigmeDeHier';
import '../styles/Home.css';
import '../styles/Background.css';

function Home() {
    const { user } = useUser();


 return (
    <>
      <div className="container">

        <h1>🧩 Bienvenue sur Enigma</h1>

<p>hello {user && <span>{user.username}</span>}</p>


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