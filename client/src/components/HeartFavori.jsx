import { useEffect, useState } from "react";
import { addFavori } from '../utils/AddFavori';
import { useUser } from '../utils/UserContext';
import { getFavorisByUser } from "../utils/GetFavoriByUser";
import '../styles/Heart.css'; 

function HeartFavori({ enigmeId }) {
  const { user } = useUser();
  const [isFavori, setIsFavori] = useState(false);
  const [error, setError] = useState(null);

  
  
  
  // particules whow
  const createMagicalStars = (cardElement) => {
    const particleCount = 15;
    const rect = cardElement.getBoundingClientRect();

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';

      const edge = Math.random() < 0.5 ? 'horizontal' : 'vertical';
      let startX, startY;

      if (edge === 'horizontal') {
        startX = rect.left + Math.random() * rect.width;
        startY = rect.top;
      } else {
        startX = Math.random() < 0.5 ? rect.left : rect.right;
        startY = rect.top + Math.random() * rect.height;
      }

      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 150 + 50;
      const endX = startX + Math.cos(angle) * distance;
      const endY = startY + Math.sin(angle) * distance;

      particle.style.left = `${startX}px`;
      particle.style.top = `${startY}px`;
      particle.style.position = 'fixed';
      particle.style.transform = `translate(0, 0)`;
      particle.style.opacity = 1;

      document.body.appendChild(particle);

      requestAnimationFrame(() => {
        particle.style.transform = `translate(${endX - startX}px, ${endY - startY}px) scale(1.2)`;
        particle.style.opacity = 0;
      });

      setTimeout(() => {
        particle.remove();
      }, 1500);
    }
  };

  useEffect(() => {
    async function checkFavori() {
      if (!user || !enigmeId) return;
      try {
        const favoris = await getFavorisByUser(user.id);
        const isFavori = favoris.some(fav => fav.enigmeId === enigmeId);
        setIsFavori(isFavori);
      } catch (err) {
        console.error('Erreur lors de la vérification du favori:', err);
        setError('Erreur lors de la vérification du favori.');
      }
    }
    checkFavori();
  }, [user, enigmeId]); 
  if (!user) return null; // Ne pas afficher le cœur si l'utilisateur n'est pas connecté
  if (error) return <p className="error">{error}</p>;


  const handleAdd = async (enigmeId) => {
    if (!user || !enigmeId) return;
    if (isFavori) {
    alert("Cette énigme est déjà dans vos favoris !");
    return;
}

  const confirmAdd = window.confirm("Êtes-vous sûr de vouloir ajouter ce favori ?");
  if (!confirmAdd) return;
    if (!user || !enigmeId) return;
    try {
      await addFavori(user.id, enigmeId);
      if (isFavori) {
        alert("Cette énigme est déjà dans vos favoris !");
        return;
      }
      setIsFavori(true);
      createMagicalStars(document.querySelector('.heart'));
      alert("Favori ajouté avec succès !");
    } catch (error) {
      console.error('Erreur lors de l\'ajout du favori:', error);
    }
  };




return(
    <div>
     <span className="heart" onClick={() => handleAdd(enigmeId)} >
        {isFavori ? <span className="red"><ion-icon id="red" name="heart"></ion-icon></span> : <span className="white"> <ion-icon name="heart-outline"></ion-icon></span>}
      </span>
      {error && <p className="error">{error}</p>}
    </div>

  );
}

export default HeartFavori;
