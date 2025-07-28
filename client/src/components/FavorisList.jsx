import {useEffect, useState } from 'react';
import { useUser } from '../utils/UserContext.jsx';
import { getFavorisByUser } from '../utils/GetFavoriByUser.jsx';
import { deleteFavorisByUser } from '../utils/DeleteFavori.jsx';
import ReponseCardDashboard from "../components/ReponseCardDashboard";
import '../styles/FavorisList.css';
import Share from "../components/Share";
import Modal from '../components/Modal.jsx';


function FavorisList() {
  const { user, loading: userLoading } = useUser();
    const [modalData, setModalData] = useState(null);
  const [favoris, setFavoris] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchFavoris() {
      if (!user) return; // return si pas co
      setLoading(true);
      try {
        const data = await getFavorisByUser(user.id);
        setFavoris(data);
      } catch (error) {
        console.error("Erreur lors du fetch des favoris:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFavoris();
  }, [user]);

  if (userLoading) return <p>Chargement utilisateur...</p>;

  // Pas co
  if (!user) {
    return (
      <div className="favoris-container">
        <h2 className="favoris-title">Mes énigmes favorites</h2>
        <p className="favoris-message">🔒 Vous devez être connecté pour voir vos énigmes favorites.</p>
      </div>
    );
  }

  if (loading) return <p>Chargement des favoris...</p>;

  if (!favoris.length) {
    return (
      <div className="favoris-container">
        <h2 className="favoris-title">Mes énigmes favorites</h2>
        <p>📭 Vous n'avez encore aucun favori.</p>
      </div>
    );
  }

const handleDelete = async (enigmeId) => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce favori ?");
    if (!confirmDelete) return;
    if (!user) return;
    try {
      await deleteFavorisByUser(user.id, enigmeId);
      setFavoris(favoris.filter(fav => fav.enigmeId !== enigmeId));
      //alert("Favori supprimé avec succès !");
      setModalData({
        title: 'Succès',
        message: 'Favori supprimé avec succès !',
        onConfirm: () => setModalData(null)
      });
    } catch (error) {
      console.error('Erreur lors de la suppression du favori:', error);
    }
  };

    console.log('Favoris récupérés:', favoris);
    console.log('date ajout favoris:', favoris.map(fav => fav.dateAdded));

  return (
    <div className="favoris-container">
      <h2 className="favoris-title">Mes énigmes favorites</h2>
      <p>Vous avez {favoris.length} énigmes favorites.</p>
      <div className="favoris-wrapper">
        {favoris.map((fav) => (
          <div className="favori-item" key={`${fav.userId}-${fav.enigmeId}`}>
            <p><strong>Énigme :</strong> {fav.Enigme?.enigme || "Aucune énigme"}</p>
            <ReponseCardDashboard
              reponse={fav.Enigme?.reponse || "Pas de réponse disponible"}
              dateEnigme={fav.Enigme?.date}
            />
            <Share enigme={fav.Enigme} />
            <p className="favori-date"><strong>Favori ajouté le :</strong> {fav.dateAdded?.slice(0, 10)}</p>
            <p className="favori-date"><strong>Date de l'énigme :</strong> {fav.Enigme?.date?.slice(0, 10)}</p>
            <div className="suppression">
              <p>Supprimer de mes favoris :</p>
              <ion-icon name="trash-outline" onClick={() => handleDelete(fav.enigmeId)}></ion-icon>
            </div>
          </div>
        ))}
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


export default FavorisList;