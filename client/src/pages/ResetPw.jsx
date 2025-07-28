import{ useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Sign.css';

function ResetPw() {
    const [email, setEmail] = useState('');
    const [secretAnswer, setSecretAnswer] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [tempPassword, setTempPassword] = useState('');
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleVerifySecret = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await fetch('http://localhost:3003/users/verify-secret', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, secretAnswer }),
            });
            const data = await response.json();

            if (response.ok) {
                setMessage('Réponse correcte. Mot de passe temporaire en cours de génération...');
                setStep(2); // passer à l’étape suivante
                handleResetPassword(); // générer automatiquement
            } else {
                setError(data.message || 'Réponse incorrecte.');
            }
        } catch (err) {
            setError("Erreur lors de la vérification.");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        try {
            const response = await fetch('http://localhost:3003/users/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();

            if (response.ok) {
                setTempPassword(data.tempPassword);
                setMessage('Mot de passe temporaire généré. Connectez-vous avec ce mot de passe.');
                console.log('Mot de passe temporaire:', data.tempPassword);
                setTimeout(() => navigate('/signin'), 30000);
            
            } else {
                setError(data.message || 'Erreur lors de la réinitialisation du mot de passe.');
            }
        } catch (err) {
            setError('Erreur serveur.');
        }
    };

    return (
        <div className="sign-container">
            <h2 className="sign-title">Réinitialisation 
               <br></br> du mot de passe</h2>
        <div className="sign-form">
            {step === 1 && (
                <form onSubmit={handleVerifySecret}>
                    <div className="form-group">
                        <label>Email :</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <p>Question secrète : <strong>Quel est votre ville de naissance ?</strong></p>
                        <input
                            type="text"
                            placeholder="Votre réponse"
                            value={secretAnswer}
                            onChange={e => setSecretAnswer(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? 'Vérification...' : 'Vérifier la réponse'}
                    </button>
                </form>
            )}

            {step === 2 && tempPassword && (
                <div className="result">
                    <h4>Mot de passe temporaire :</h4>
                    <p style={{ color: 'green', fontWeight: 'bold' }}>{tempPassword}</p>
                    <p>Veuillez l'utiliser pour vous connecter, puis modifiez-le dans votre profil.</p>
                </div>
            )}

            {message && <p className="message">{message}</p>}
            {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
        </div>
        </div>
    );
}

export default ResetPw;
