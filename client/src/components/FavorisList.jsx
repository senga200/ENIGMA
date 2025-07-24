import React, { use, useEffect, useState } from 'react';
import { useUser } from '../utils/UserContext.jsx';
import { getFavorisByUser } from '../utils/GetFavoriByUser.jsx';
import { deleteFavorisByUser } from '../utils/DeleteFavori.jsx';
import ReponseCardDashboard from "../components/ReponseCardDashboard";
import cookieParser from 'cookie-parser';

function FavorisList() {
  const { user, loading: userLoading } = useUser();
  const [favoris, setFavoris] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    if (!user) return;
    async function fetchFavoris() {
      setLoading(true);
      const data = await getFavorisByUser(user.id);
      setFavoris(data);
      setLoading(false);
    }
    fetchFavoris();
  }, [user]);

  if (userLoading) return <p>Chargement utilisateur...</p>;
  if (loading) return <p>Chargement favoris...</p>;
  if (!favoris.length) return <p>Pas de favoris.</p>;

  const handleDelete = async (enigmeId) => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce favori ?");
    if (!confirmDelete) return;
    if (!user) return;
    try {
      await deleteFavorisByUser(user.id, enigmeId);
      setFavoris(favoris.filter(fav => fav.enigmeId !== enigmeId));
      alert("Favori supprimé avec succès !");
    } catch (error) {
      console.error('Erreur lors de la suppression du favori:', error);
    }
  };

    console.log('Favoris récupérés:', favoris);
    const today = new Date().toISOString().slice(0, 10);
    console.log('Date du jour:', today);



  return (
    <ul>
      {favoris.map((fav) => (
        <li key={`${fav.userId}-${fav.enigmeId}`}>
          {fav.Enigme?.enigme || "pas d'énigme disponible"}
<ReponseCardDashboard 
  reponse={fav.Enigme?.reponse || "Pas de réponse disponible"} 
  dateEnigme={fav.Enigme?.date}
/>

            <button onClick={() => alert(`Partage de l'énigme ${fav.enigmeId} !`)}>
            Partager l'énigme
          </button>
          <button onClick={() => handleDelete(fav.enigmeId)}>
            Supprimer des favoris
          </button>
          <p>Favori ajouté le : {fav.dateAdded}</p>
          <p>Date de l'énigme : {fav.Enigme?.date?.slice(0, 10) || "Pas de date disponible"}</p>
      
          
          <p>Utilisateur ID : {fav.userId}</p>
          <p>Enigme ID : {fav.enigmeId}</p>
        </li>
      ))}
    </ul>
  );
}


export default FavorisList;