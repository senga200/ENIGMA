

import { useEffect, useState } from 'react';
import { getEnigmes } from '../utils/GetEnigmes';
import '../styles/EnigmeCard.css';
import HeartFavori from './HeartFavori';
import MagicIndiceCard from './MagicIndiceCard';
import { useUser } from '../utils/UserContext';

function EnigmeDeHier() {
  const [enigme, setEnigme] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    async function fetchEnigmeDeHier() {
      const all = await getEnigmes();
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      const enigmeDeHier = all.find(e => e.date && e.date.slice(0, 10) === yesterday);
      // const yesterday = new Date('2025-07-18').toISOString().slice(0, 10);
      // const enigmeDeHier = all.find(e => e.date && e.date.slice(0, 10) === yesterday);
      setEnigme(enigmeDeHier || null);
    }

    fetchEnigmeDeHier();
  }, []);

  if (!enigme) return <p className="enigme-message">Aucune énigme pour hier.</p>;
  if (!enigme.enigme || !enigme.reponse) return <p className="enigme-message">Énigme du jour indisponible.</p>;
  console.log('Enigme de hier:', enigme);

  return (
    <div className="enigme-container">
      <p className="enigme-label">Hier, l'énigme était :</p>
      <span className="heart-icon">
        <HeartFavori enigmeId={enigme.id} />
      </span>
      <p className="enigme-text">{enigme.enigme}</p>
        <MagicIndiceCard indice={enigme.reponse} revealText="Découvre la réponse" />
      <p className="enigme-date">Hier, nous étions le : {new Date(enigme.date).toLocaleDateString()}</p>
      <span className='favoris'>
        {user ? (
          <>
          <p className='favoris-message'>  <a href="/dashboard">Retrouve ici tes énigmes favorites !</a> </p>
          </>
        ) : (
          <>
          <p>Connecte-toi pour ajouter cette énigme à tes favoris et la retrouver plus tard !</p>
          </>
        )}
      </span>
    </div>

  );
}
export default EnigmeDeHier;
