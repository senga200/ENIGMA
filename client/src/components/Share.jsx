
import React from 'react';
import '../styles/Share.css';

function Share({ enigme }) {
  if (!enigme) return null;

  const baseUrl = 'https://www.senga200.fr';
  const shareText = `Devine cette énigme avec moi ! 🧩\n\n"${enigme.enigme}"\n\nDécouvre-la sur ${baseUrl}`;
  const encodedText = encodeURIComponent(shareText);
  const pageUrl = encodeURIComponent(baseUrl);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareText);
    alert('Lien copié dans le presse-papiers !');
  };

  return (
    <div className="share-container">  
    <p className="share-title">✨ Partage cette énigme :</p>
          <div className="share">
          

      <div className="share-buttons">
      <a
        href={`https://api.whatsapp.com/send?text=${encodedText}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <button><ion-icon name="logo-whatsapp"></ion-icon></button>
      </a>
      <button onClick={copyToClipboard}><ion-icon name="copy-outline"></ion-icon></button>
      <a
        href={`mailto:?subject=Enigme&body=${encodedText}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <button><ion-icon name="mail-outline"></ion-icon></button>
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}&quote=${encodedText}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <button><ion-icon name="logo-facebook"></ion-icon></button>
      </a>
      </div>
    </div>
    </div>

  );
}

export default Share;
