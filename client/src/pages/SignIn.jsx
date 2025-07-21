import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../utils/UserContext';

function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useUser(); // login depuis le contexte
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');

        try {
            const response = await fetch('http://localhost:3003/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Identifiants incorrects');
            }

            const data = await response.json();
            console.log('Connexion réussie:', data);
            login(data); // Stocke dans le contexte
            setUsername('');
            setPassword('');
            navigate('/'); 
        } catch (error) {
            setErrorMsg(error.message);
        }
        setLoading(false);
    };

    return (
        <div className="signin-container">
            <h1>Connexion</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Nom d'utilisateur</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Connexion...' : 'Se connecter'}
                </button>
                {errorMsg && <p className="error">{errorMsg}</p>}
            </form>

            <p>Pas encore inscrit ? <a href="/signup">Créer un compte</a></p>
            <p>Mot de passe oublié ? <a href="/reset-password">Réinitialiser</a></p>
            <p>Retour à la <a href="/">page d'accueil</a></p>
        </div>
    );
}

export default SignIn;
