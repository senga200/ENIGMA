import express from 'express';
import { authUser } from '../controllers/authController.js';


const router = express.Router();

// Route pour l'authentification de l'utilisateur
router.post('/login', authUser);
// Route pour l'inscription ?
// router.post('/register', registerUser); 
// Route pour la déconnexion ?
// router.post('/logout', logoutUser);

export default router;

   