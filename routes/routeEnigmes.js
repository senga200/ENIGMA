import express from 'express';
import {
  generateAndSaveEnigme,
  getEnigmeDuJour,
  getAllEnigmes,
  updateEnigme,
  deleteEnigme,
} from '../controllers/enigmeController.js';


const router = express.Router();


router.post('/generate', generateAndSaveEnigme);
router.get('/today', getEnigmeDuJour);
router.get('/all', getAllEnigmes);
router.put('/:id', updateEnigme);
router.delete('/:id', deleteEnigme);


router.get('/', (req, res) => {
  res.send('Hello World from Enigmes Route!');
});

export default router;
