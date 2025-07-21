

import { useEffect, useState } from 'react';
import { getEnigmes } from '../utils/GetEnigmes';
import '../styles/EnigmeDeHier.css';

function EnigmeDeHier() {
  const [enigme, setEnigme] = useState(null);

  useEffect(() => {
    async function fetchEnigmeDeHier() {
      const all = await getEnigmes();
      //   const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
//   const enigmeDeHier = all.find(e => e.date && e.date.slice(0, 10) === yesterday);
      const yesterday = new Date('2025-07-18').toISOString().slice(0, 10);
      const enigmeDeHier = all.find(e => e.date && e.date.slice(0, 10) === yesterday);
      setEnigme(enigmeDeHier || null);
    }

    fetchEnigmeDeHier();
  }, []);

  if (!enigme) return <p className="enigme-message">Aucune énigme pour hier.</p>;
  if (!enigme.enigme || !enigme.reponse) return <p className="enigme-message">Énigme du jour indisponible.</p>;

  return (
    <div className="enigme-container">
      <p className="enigme-label">Hier, l'énigme était :</p>
      <p className="enigme-text">{enigme.enigme}</p>
      <p className="enigme-reponse">💡 Réponse : <span>{enigme.reponse}</span></p>
      <p className="enigme-date">📅 {new Date(enigme.date).toLocaleDateString()}</p>
    </div>
  );
}

export default EnigmeDeHier;
