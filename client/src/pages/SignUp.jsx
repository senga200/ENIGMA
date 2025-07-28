import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../utils/UserContext';
import '../styles/Sign.css';


function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [secretAnswer, setSecretAnswer] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const navigate = useNavigate();
    const { login } = useUser(); // Accès à login depuis le contexte

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');
        if (!username || !password || !email) {
            setErrorMsg('Veuillez remplir tous les champs');
            setLoading(false);
            return;
        }
        if (password.length < 5) {
            setErrorMsg('Le mot de passe doit contenir au moins 5 caractères');
            setLoading(false);
            return;
        }   
         const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setErrorMsg('Veuillez entrer une adresse e-mail valide');
            setLoading(false);
            return;
        }   
        setErrorMsg(''); // Réinitialiser le message d'erreur avant la requête
        setLoading(true);


        try {
            const response = await fetch('http://localhost:3003/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, email, secretAnswer }),
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
            setSecretAnswer('');
            setEmail('');
            navigate('/'); 
        } catch (error) {
            setErrorMsg(error.message);
        }
        setLoading(false);
    };

    return (
        <div className="sign-container">
            <h2 className="sign-title">Inscription</h2>
            <p className='bienvenue'>Bienvenue sur la page d'inscription !</p>
            <p className='bienvenue'>Veuillez remplir le formulaire pour créer un compte.</p>
        <div className="sign-form">
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
                <div className="checkbox-inline">
                <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                />
                <label htmlFor="showPassword" className="checkbox-label">
                Afficher le mot de passe
                </label>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="email">Adresse e-mail</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
                <label htmlFor="secretAnswer">Réponse à la question secrète</label>
                <input
                    type="text"
                    id="secretAnswer"
                    value={secretAnswer}
                    onChange={(e) => setSecretAnswer(e.target.value)}
                    placeholder="Quel est votre ville de naissance ?"
                    required
                />  
            </div>
        
           
            <button type="submit">S'inscrire</button>
            </form>
        </div>
        {errorMsg && <p className="error">{errorMsg}</p>}
        <p className='bienvenue'>Déjà inscrit ? <a href="/signin">Se connecter</a></p>
        <p className='bienvenue'>Retour à la <a href="/">page d'accueil</a></p>
    </div>
  );
}

export default SignUp;

