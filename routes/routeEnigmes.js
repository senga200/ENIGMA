import express from 'express';
import {
  generateAndSaveEnigme,
 // getEnigmeDuJour,
 // updateEnigme,
 // deleteEnigme,
} from '../controllers/enigmeController.js';

const router = express.Router();


// Routes CRUD Enigme
router.post('/generate', generateAndSaveEnigme);
//router.get('/enigmes/today', getEnigmeDuJour);
//router.put('/enigmes/:id', updateEnigme);
//router.delete('/enigmes/:id', deleteEnigme);


router.get('/', (req, res) => {
  res.send('Hello World from Enigmes Route!');
});

export default router;
