import { useUser } from '../utils/UserContext';
import { updateEmail, deleteUser} from '../utils/UpdateUser';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/Profil.css';



function Profil() {
  const { user, setUser } = useUser();
  const [newEmail, setNewEmail] = useState('');
  const navigate = useNavigate();

  console.log("Profil user:", user);

  const handleEmailChange = async () => {
    try {
      await updateEmail(user.id, newEmail);
      alert('Email mis à jour avec succès');
      setUser({ ...user, email: newEmail });
      setNewEmail('');
    } catch (error) {
      console.error('Erreur mise à jour email:', error);
      alert('Erreur lors de la mise à jour de l\'email');
    }
  };  

  const handleDeleteAccount = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer votre compte ?')) {
      try {
        await deleteUser(user.id);
        alert('Compte supprimé avec succès');
        setUser(null);
        navigate('/');
      } catch (error) {
        console.error('Erreur suppression compte:', error);
        alert('Erreur lors de la suppression du compte');
      }
    }
  };

  if (!user) {
    return <p>Créé un compte !!    
      <button className="btn" onClick={() => navigate('/signup')}>
      Créer un compte
    </button>  </p>;

  }
  if (!user.id) {
    return <p>Utilisateur non connecté.</p>;
  } 



  return (
    <div className="container">
      <h1>Mon Profil</h1>
      <section>
        <h2>Mes informations</h2>
      {!user ? (
  <p>Chargement des informations...</p>
) : (
  <>
    <p><strong>Nom :</strong> {user.username}</p>
    <p><strong>Email :</strong> {user.email}</p>
    <p>Inscrit depuis : {new Date(user.createdAt).toLocaleDateString()}</p>
    <p>Dernière connexion : {new Date(user.lastLogin).toLocaleDateString()}</p>
    <p>
      Changer mon email :
      <input
        type="email"
        placeholder="Nouvel email"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
      />
      <button className="btn" onClick={handleEmailChange}>
        Mettre à jour
      </button>
    </p>
    <p>
      Supprimer mon compte :
      <button className="btn" onClick={handleDeleteAccount}>
        Supprimer
      </button>
    </p>
  </>
)}

    </section>
  </div>
);

}

export default Profil;