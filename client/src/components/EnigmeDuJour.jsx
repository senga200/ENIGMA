

import { useEffect, useState } from 'react';
import { getEnigmes } from '../utils/GetEnigmes';
import MagicIndiceCard from './MagicIndiceCard';
import HeartFavori from './HeartFavori';
import Share from './Share';
import Modal from './Modal';
import '../styles/EnigmeCard.css';


function EnigmeDuJour() {
  const [enigme, setEnigme] = useState(null);
  const [modalData, setModalData] = useState(null);

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


function DistanceDeLevenshtein(a, b) {
  const matrix = [];

  // Initialiser la première ligne et la première colonne de la matrice
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Remplir la matrice en comparant chaque caractère des chaînes
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // Substitution
          matrix[i][j - 1] + 1, // Insertion
          matrix[i - 1][j] + 1 // Suppression
        );
      }
    }
  }

  return matrix[b.length][a.length];
}


  const handleCheckAnswer = (userAnswer) => {
    const userAnswerTrimmed = userAnswer.trim().toLowerCase();
    const currentAnswerLowerCase = enigme.reponse.toLowerCase();
    const levenshteinTolerance = 2; // Tolérance de 2 changements
    const levenshteinDistance = DistanceDeLevenshtein(
      userAnswerTrimmed,
      currentAnswerLowerCase
    );
    if (userAnswerTrimmed === "") {
      setModalData({
        title: 'Il manque quelque chose',
        message: 'Veuillez entrer une réponse avant de vérifier.',
        onConfirm: () => setModalData(null)
      });
      return;
    }
    if (levenshteinDistance <= levenshteinTolerance) {
      setModalData({
        title: 'Bravo',
        message: "Bravo, c'est la bonne réponse !",
        onConfirm: () => setModalData(null)
      });
    } else {
      setModalData({
        title: 'Sorry',
        message: "Désolé, ce n'est pas la bonne réponse. Essayez encore !",
        onConfirm: () => setModalData(null)
      });
    }
  }
 



 return (
    <div className="enigme-container">
      <p className="enigme-label">Voici l'énigme du jour 🔮 :</p>
      <span className="heart-icon">
        <HeartFavori enigmeId={enigme.id} />
      </span>
      <p className="enigme-text">{enigme.enigme}</p>
      <MagicIndiceCard indice={enigme.indice} revealText="Découvre l'indice" />

      <p className="enigme-date">Nous sommes le : {enigme.date ? new Date(enigme.date).toLocaleDateString() : 'Inconnue'}</p>
      <Share enigme={enigme} />
      <div className='user-reponse'>
      <p>tu as deviné ? vérifions cela : </p>
      <input type="text" className="enigme-reponse" placeholder="Ta réponse ici..." />
      <button className="profile-cta" onClick={() => handleCheckAnswer(document.querySelector('.enigme-reponse').value)}>
        Vérifier la réponse
      </button>
      </div>
       {modalData && (
  <Modal
    title={modalData.title}
    message={modalData.message}
    onConfirm={modalData.onConfirm}
    onClose={modalData.onClose || (() => setModalData(null))}
    confirmText={modalData.confirmText}
    cancelText={modalData.cancelText}
    showCancel={modalData.showCancel}
  />
)}

      
    </div>
      );
    }
  

export default EnigmeDuJour;
