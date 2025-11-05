import { User } from '../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

    //voir si la co est secure https
    function detectSecure(req) {
    // req.secure est true si la requête est en HTTPS directe
    // si TLS est terminé par un reverse proxy, vérifier x-forwarded-proto
    return !!(req.secure || (req.headers['x-forwarded-proto'] === 'https'));
    }


export const authUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }

    // Comparer le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    // Générer le token
    const token = jwt.sign(
      { userId: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '24h' }
    );
    // Détecte si la connexion est secure (HTTPS)
    const isSecure = detectSecure(req);



    // Options du cookie : sameSite None nécessaire pour cross-site uniquement si HTTPS
    const cookieOptions = {
      httpOnly: true,
      secure: !!isSecure, // true seulement en HTTPS
      sameSite: isSecure ? 'None' : 'Lax',
      maxAge: 24 * 60 * 60 * 1000, 
      path: '/',
    };

    // Envoyer le token dans un cookie
    res.cookie('token', token, cookieOptions);
console.log('getMe user:', user.toJSON ? user.toJSON() : user);

    // Réponse avec infos utilisateur
    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
        createdAt: user.createdAt?.toISOString() || user.createdAt,
    });

  } catch (error) {
    console.error('Erreur authUser :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


export const getMe = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Non authentifié' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findByPk(decoded.userId);

    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error('Erreur getMe :', error);
    res.status(401).json({ message: 'Session invalide ou expirée' });
  }
};


export const logout = (req, res) => {
  const isSecure = detectSecure(req);
  res.clearCookie('token', {
    httpOnly: true,
    //secure: process.env.NODE_ENV === 'production',
    //sameSite: 'Strict',
    secure: !!isSecure,
    sameSite: isSecure ? 'None' : 'Lax',
    path: '/',
  });
  res.status(200).json({ message: 'Déconnecté avec succès' });
};
