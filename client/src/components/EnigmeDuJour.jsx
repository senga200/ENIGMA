import { useEffect, useState } from 'react';
import { getEnigmes } from '../utils/GetEnigmes';

function EnigmeDuJour() {
  const [enigme, setEnigme] = useState(null);

  useEffect(() => {
    async function fetchEnigmeDuJour() {
      const all = await getEnigmes();
      console.log('toutes Enigmes récupérées:', all);
      const today = new Date().toISOString().slice(0, 10); 
      console.log('Date du jour:', today);
      const enigmeDuJour = all.find(e => e.date && e.date.slice(0, 10) === today);
      console.log('Énigme du jour trouvée:', enigmeDuJour);
      setEnigme(enigmeDuJour || null);
    }

    fetchEnigmeDuJour();
  }, []);

  if (!enigme) return <p>Aucune énigme pour aujourd’hui.</p>;
  if (!enigme.enigme || !enigme.reponse) return <p>Énigme du jour indisponible.</p>;

  return (
    <div>
      <p>Voici l'énigme du jour :</p>
      <h3>{enigme.enigme}</h3>
      <p>{enigme.reponse}</p>
      <p>Date de l'énigme : {enigme.date ? new Date(enigme.date).toLocaleDateString() : 'Inconnue'}</p>
      
    </div>
  );
}

export default EnigmeDuJour;

