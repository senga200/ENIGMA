import { useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../utils/UserContext';


function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const navigate = useNavigate();
    const { login } = useUser(); // Accès à login depuis le contexte

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');

        try {
            const response = await fetch('http://localhost:3003/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, email }),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Erreur lors de l\'inscription');
            }

            const data = await response.json();
            console.log('Inscription réussie:', data);
            login(data); // Stocke l'utilisateur dans le contexte
            setUsername('');
            setPassword('');
            setEmail('');
            navigate('/'); 
        } catch (error) {
            setErrorMsg(error.message);
        }
        setLoading(false);
    };

    return (
        <div className="container">
            <h1>Inscription</h1>
            <p>Bienvenue sur la page d'inscription !</p>
            <p>Veuillez remplir le formulaire pour créer un compte.</p>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="username">Nom d'utilisateur</label>
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="form-group">
                <label htmlFor="password">Mot de passe</label>
<input
  type={showPassword ? "text" : "password"}
  id="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  required
/>
<label>
  <input
    type="checkbox"
    checked={showPassword}
    onChange={() => setShowPassword(!showPassword)}
  />
  Afficher le mot de passe
</label>

            </div>
            <div className="form-group">
                <label htmlFor="email">Adresse e-mail</label>
<input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
           
            <button type="submit">S'inscrire</button>
        </form>
        {errorMsg && <p className="error">{errorMsg}</p>}
        <p>Déjà inscrit ? <a href="/signin">Se connecter</a></p>
        <p>Retour à la <a href="/">page d'accueil</a></p>
    </div>
  );
}

export default SignUp;

