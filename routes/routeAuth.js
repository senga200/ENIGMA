import express from 'express';
import { authUser, getMe, logout } from '../controllers/authController.js';


const router = express.Router();


router.post('/login', authUser);
router.get('/me', getMe);
router.post('/logout', logout);

export default router;

   