import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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

    // Envoyer le token dans un cookie sécurisé
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 24 * 60 * 60 * 1000, // 24h
    });

    // Réponse avec infos utilisateur
    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });

  } catch (error) {
    console.error('Erreur authUser :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
