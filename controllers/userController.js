import { User } from '../models/index.js';
import bcrypt from "bcrypt";
//import jwt from 'jsonwebtoken';

export const postUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur
    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
      role: 'user', // Par défaut, le rôle est 'user'
    });

    res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
    });

  } catch (error) {
    console.error('Erreur postUser :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    // Récupérer tous les utilisateurs
    const users = await User.findAll({
      attributes: { exclude: ['password'] } // Exclure le mot de passe des résultats
    });

    res.status(200).json(users);

  } catch (error) {
    console.error('Erreur getAllUsers :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
}

// export const getCurrentUser = async (req, res) => {
//   try {
//     const token = req.cookies.token; // Récupérer le token du cookie

//     if (!token) {
//       return res.status(401).json({ message: 'Non autorisé' });
//     }

//     // Vérifier le token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

//     // Trouver l'utilisateur par ID
//     const user = await User.findByPk(decoded.userId, {
//       attributes: { exclude: ['password'] } // Exclure le mot de passe des résultats
//     });

//     if (!user) {
//       return res.status(404).json({ message: 'Utilisateur non trouvé' });
//     }

//     res.status(200).json(user);

//   } catch (error) {
//     console.error('Erreur getCurrentUser :', error);
//     res.status(500).json({ message: 'Erreur serveur' });
//   }
// }

export const getUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Trouver l'utilisateur par ID
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Exclure le mot de passe du résultat
    const { password, ...userData } = user.toJSON();
    res.status(200).json(userData);

  } catch (error) {
    console.error('Erreur getUser :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email, role } = req.body;

    // Trouver l'utilisateur par ID
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Mettre à jour les informations de l'utilisateur
    user.username = username || user.username;
    user.email = email || user.email;
    user.role = role || user.role;

    await user.save();

    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });

  } catch (error) {
    console.error('Erreur updateUser :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
}

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Trouver l'utilisateur par ID
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Supprimer l'utilisateur
    await user.destroy();

    res.status(204).send(); // No content

  } catch (error) {
    console.error('Erreur deleteUser :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
}


export const changePassword = async (req, res) => {
  try {
    const userId = req.params.id;
    const { oldPassword, newPassword } = req.body;

    // Trouver l'utilisateur par ID
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Vérifier l'ancien mot de passe
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Ancien mot de passe incorrect' });
    }

    // Hacher le nouveau mot de passe
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: 'Mot de passe mis à jour avec succès' });

  } catch (error) {
    console.error('Erreur changePassword :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
}

export const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Trouver l'utilisateur par email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Générer un nouveau mot de passe temporaire
    const tempPassword = Math.random().toString(36).slice(-8); // mot de passe aléatoire de 8 caractères
    
    // Afficher le mot de passe temporaire dans la console
    console.log(`Mot de passe temporaire pour ${email} : ${tempPassword}`);

    // Hacher le nouveau mot de passe
    user.password = await bcrypt.hash(tempPassword, 10);
    await user.save();

    res.status(200).json({ message: 'Mot de passe réinitialisé'  });
    console.log(`Mot de passe temporaire pour ${email} : ${tempPassword}`);
  } catch (error) {
    console.error('Erreur resetPassword :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
}


export const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.query;

    // Trouver l'utilisateur par email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Exclure le mot de passe du résultat
    const { password, ...userData } = user.toJSON();
    res.status(200).json(userData);

  } catch (error) {
    console.error('Erreur getUserByEmail :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
}


export const updateUserRole = async (req, res) => {
  try {
    const userId = req.params.id;
    const { role } = req.body;

    // Vérifier si le rôle est valide
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Rôle invalide' });
    }

    // Trouver l'utilisateur par ID
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Mettre à jour le rôle de l'utilisateur
    user.role = role;
    await user.save();

    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });

  } catch (error) {
    console.error('Erreur updateUserRole :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
}

export const getUsersByRole = async (req, res) => {
  try {
    const { role } = req.params;

    // Vérifier si le rôle est valide
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Rôle invalide' });
    }

    // Récupérer les utilisateurs par rôle
    const users = await User.findAll({
      where: { role },
      attributes: { exclude: ['password'] } // Exclure le mot de passe des résultats
    });

    res.status(200).json(users);

  } catch (error) {
    console.error('Erreur getUsersByRole :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
}


