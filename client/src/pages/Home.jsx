
import { useUser } from '../utils/UserContext';
import EnigmeDuJour from '../components/EnigmeDuJour';
import EnigmeDeHier from '../components/EnigmeDeHier';
import image from '../assets/titre.png';
import '../styles/Home.css';
import '../styles/Background.css';

function Home() {
    const { user } = useUser();


 return (
    <>
      <div className="container">
        <h1>  <div className="logo">
        <img src={image} alt="Logo Enigma" />
      </div></h1>

     <div className="username">
<p> {user && <span>Bonjour {user.username}</span>}</p>
</div>
        <section>
            <EnigmeDuJour />
            <EnigmeDeHier />
        </section>
      </div>
    </>
  );
}

export default Home;