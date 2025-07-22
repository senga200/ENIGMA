import express from 'express';
import {
  addFavori,
  deleteFavori,
  getFavorisByUser,
} from '../controllers/favoriController.js';

const router = express.Router();

router.post('/add', addFavori);
router.get('/user/:userId', getFavorisByUser);
router.delete('/deleteFavori', deleteFavori);
// Suppression via body { userId, enigmeId }

export default router;
