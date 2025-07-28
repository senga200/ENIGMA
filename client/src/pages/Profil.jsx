import { useUser } from '../utils/UserContext';
import { updateEmail, deleteUser, updatePassword} from '../utils/UpdateUser';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profil.css';
import Modal from '../components/Modal';




function Profil() {
  const { user, setUser } = useUser();
  const [modalData, setModalData] = useState(null);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  

  console.log("Profil user:", user);

  const handleEmailChange = async () => {
    if (!newEmail) {
     // alert('Veuillez entrer un nouvel email');
      setModalData({
        title: 'Il manque quelque chose',
        message: 'Veuillez entrer un nouvel email',
        onConfirm: () => setModalData(null)
      });
      setNewEmail('');
      setNewPassword('');
      setOldPassword('');
      setShowPassword(false);
      return;
    } 
    if (newEmail === user.email) {
      //alert('Le nouvel email est identique à l\'actuel');
      setModalData({
        title: 'Quelque chose ne va pas',
        message: 'Le nouvel email est identique à l\'actuel',
        onConfirm: () => setModalData(null)
      });
      setNewEmail('');
      setNewPassword('');
      setOldPassword('');
      setShowPassword(false);
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(newEmail)) {
      //alert('Veuillez entrer un email valide');
      setModalData({
        title: 'Oups',
        message: 'Veuillez entrer un email valide',
        onConfirm: () => setModalData(null)
      });
      setNewEmail('');
      setNewPassword('');
      setOldPassword('');
      setShowPassword(false);
      return;
    }
        try {
      await updateEmail(user.id, newEmail);
            setModalData({
            title: 'Bravo',
            message: 'Email mis à jour avec succès',
            onConfirm: () => setModalData(null)
});

    // refetch après update
    const response = await fetch('/auth/me', {
      credentials: 'include'
    });

    if (response.ok) {
      const updatedUser = await response.json();
      setUser(updatedUser);
    }

    setNewEmail('');
      setNewEmail('');
    }
 catch (error) {
      console.error('Erreur mise à jour email:', error);

      alert('Erreur lors de la mise à jour de l\'email');
      setNewEmail('');
      setNewPassword('');
      setOldPassword('');
      setShowPassword(false);
    }
  };  

  const handlePasswordChange = async () => {
    if (!oldPassword || !newPassword) {
     setModalData({
            title: 'Il manque quelque chose',
            message: 'Veuillez remplir les deux champs de mot de passe',
            onConfirm: () => setModalData(null)
          }
      );
      return;
    }
    if (oldPassword === newPassword) {
      setModalData({
            title: 'Oups',
            message: 'Le nouveau mot de passe doit être différent de l\'ancien',
            onConfirm: () => setModalData(null)
      });
      return;
    }
    if (newPassword.length < 5) {
      setModalData({
            title: 'Oups',
            message: 'Le mot de passe doit contenir au moins 5 caractères',
            onConfirm: () => setModalData(null)
      });
      return;
    }
    try {
      await updatePassword(user.id, oldPassword, newPassword);
      //alert('Mot de passe mis à jour avec succès');
      setModalData({
        title: 'Succès',
        message: 'Mot de passe mis à jour avec succès',
        onConfirm: () => setModalData(null)
      });
      setOldPassword('');
      setNewPassword('');
    } catch (error) {
      console.error('Erreur mise à jour mot de passe:', error);
      //alert('Erreur lors de la mise à jour du mot de passe');
      setModalData({
        title: 'Oups',
        message: 'Erreur lors de la mise à jour du mot de passe',
        onConfirm: () => setModalData(null)
      });
      setOldPassword('');
      setNewPassword('');
      setShowPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Es-tu sûr de vouloir supprimer ton compte ?')) {
      try {
        await deleteUser(user.id);
        //alert('Compte supprimé avec succès');
        setModalData({
          title: 'Succès',
          message: 'Compte supprimé avec succès',
          onConfirm: () => {
            setModalData(null);
            navigate('/');
          }
        });
        setUser(null);
        navigate('/');
      } catch (error) {
        console.error('Erreur suppression compte:', error);
        //alert('Erreur lors de la suppression du compte');
        setModalData({
          title: 'Oups',
          message: 'Erreur lors de la suppression du compte',
          onConfirm: () => setModalData(null),
          showCancel: true,
          cancelText: 'Fermer'
        });
        setUser(null); 
        navigate('/');
      }
    }
  };

  if (!user) {
    return (
      <div className="sign-container">
        <div className='user-non-co-cta'>
        <p className="user-non-co">
          Connecte toi pour accéder à ton profil
          <br />
          <br />
        </p>
          <button className="btn" onClick={() => navigate('/signin')}>
            Se connecter
          </button>
          <br />
          <br />
          <p className="user-non-co"> 
            Tu n'as pas de compte ?
            <br />
            <br />
          </p>
          <button className="btn" onClick={() => navigate('/signup')}>
            Créer un compte
          </button>
        </div>
      </div>
    );
  }

  
 

  return (
  <div className="profile-container">
    <h2 className="profile-title">Mon Profil</h2>
    <div className="profile-card">
    
    <section>

      {!user ? (
    <p>Chargement des informations...</p>
) : (
  <>
    <div className="profile-infos"><strong>Username : </strong>{user.username}</div>
    <div className="profile-infos"><strong>Email :</strong> {user.email}</div>
    <div className="profile-infos"><strong>Inscrit depuis : </strong>{new Date(user.createdAt).toLocaleDateString()}</div>
  
    <div className="profile-cta">
      <strong>Changer mon email :</strong>
      <input
        className="email-input"
        id='email'
        name='email'
        type="email"
        placeholder="Nouvel email"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
      />
      <button className="btn" onClick={handleEmailChange}>
        Mettre à jour
      </button>
    </div>
    <div className="profile-cta">
      <strong>Changer mon mot de passe :</strong>
  <br />
  <input
    className="password-input"
    type={showPassword ? 'text' : 'password'}
    placeholder="Ancien mot de passe"
    value={oldPassword}
    onChange={(e) => setOldPassword(e.target.value)}
  />
  <input
    className="password-input"
    type={showPassword ? 'text' : 'password'}
    placeholder="Nouveau mot de passe"
    value={newPassword}
    onChange={(e) => setNewPassword(e.target.value)}
  />
  <label htmlFor="showPassword" className="checkbox-label">
    <div className="checkbox-inline">
    <input
      type="checkbox"
      checked={showPassword}
      onChange={() => setShowPassword(!showPassword)}
      />
      Afficher
      </div>
      </label>
      <button className="btn" onClick={handlePasswordChange}>Changer</button>
    </div>
   <div className="profile-cta">
    <strong>Supprimer mon compte :</strong>
    <span>Attention, cette action est irréversible !</span>
    <br></br>
    <button className="btn" onClick={handleDeleteAccount}>
    Supprimer
    </button>
  </div>
  </>
)}

    </section>
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

export default Profil;