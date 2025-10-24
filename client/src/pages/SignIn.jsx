import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../utils/UserContext';
import { apiFetchJson } from '../utils/api';
import '../styles/Sign.css';

function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useUser(); // login depuis le contexte
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');

        if (!username || !password) {
            setErrorMsg('Veuillez remplir tous les champs');
            setLoading(false);
            return;
        }

        try {
            // apiFetchJson lancera une erreur si response.ok === false
            const data = await apiFetchJson('/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            
            console.log('Connexion réussie:', data);
            login(data); // Stocke dans le contexte
            setUsername('');
            setPassword('');
            navigate('/'); 
        } catch (error) {
            setErrorMsg(error.message || 'Erreur lors de la connexion');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="sign-container">
            <h2 className="sign-title">Connexion</h2>
            <div className="sign-form">
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
                        type={showPassword ? 'text' : 'password'}
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
                <button type="submit" disabled={loading}>
                    {loading ? 'Connexion...' : 'Se connecter'}
                </button>
                {errorMsg && <p className="error">{errorMsg}</p>}
            </form>
            </div>

            <div className="signin-links">
                <p>Pas encore inscrit ? <a href="/signup">Créer un compte</a></p>
                <p>Mot de passe oublié ? <a href="/reset-password">Réinitialiser</a></p>
                <p>Retour à la <a href="/">page d'accueil</a></p>
            </div>
        </div>
    );
}

export default SignIn;