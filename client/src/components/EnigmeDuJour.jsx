

import { useEffect, useState } from 'react';
import { getEnigmes } from '../utils/GetEnigmes';
import MagicIndiceCard from './MagicIndiceCard';
import HeartFavori from './HeartFavori';


function EnigmeDuJour() {
  const [enigme, setEnigme] = useState(null);

  useEffect(() => {
    async function fetchEnigmeDuJour() {
      const all = await getEnigmes();
      const today = new Date().toISOString().slice(0, 10); 
      const enigmeDuJour = all.find(e => e.date && e.date.slice(0, 10) === today);
      setEnigme(enigmeDuJour || null);
    }

    fetchEnigmeDuJour();
  }, []);

  if (!enigme) return <p>Aucune énigme pour aujourd’hui.</p>;
  if (!enigme.enigme || !enigme.reponse) return <p>Énigme du jour indisponible.</p>;

  const baseUrl = 'https://www.senga200.fr';
  const shareText = `Devine l’énigme du jour avec moi ! 🧩\n\n"${enigme.enigme}"\n\nDécouvre-la sur ${baseUrl}`;
  const encodedText = encodeURIComponent(shareText);
  const pageUrl = encodeURIComponent(baseUrl);


    const copyToClipboard = () => {
    navigator.clipboard.writeText(`${shareText}`).then(() => {
      alert('Lien copié dans le presse-papiers !');
    });
  };



  return (
<div className="enigme-today-container">
      <div className="enigme-today">
      <p>Voici l'énigme du jour :</p>
      <h3>{enigme.enigme}</h3>
      <MagicIndiceCard indice={enigme.indice} />

      <p>Date de l'énigme : {enigme.date ? new Date(enigme.date).toLocaleDateString() : 'Inconnue'}</p>
    </div>
      <HeartFavori />
    <div className="share">
      <p>Partagez cette énigme :</p>
        <a
          href={`https://api.whatsapp.com/send?text=${encodedText}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button>Partager sur WhatsApp</button>
        </a>
              <button onClick={copyToClipboard}>📋 Copier le lien</button>

        <a
          href={`mailto:?subject=Enigme du jour&body=${encodedText}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button>✉️ Envoyer par e-mail</button>
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}&quote=${encodedText}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button>Partager sur Facebook</button>
        </a>
  
      </div>

</div>
    
  );
}

export default EnigmeDuJour;
