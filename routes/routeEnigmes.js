import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

const FLOWISE_ENIGME_ID = process.env.FLOWISE_FLOWCHART_ENIGME_ID;

async function query(data) {
  const response = await fetch(
    "http://51.38.186.158:3000/api/v1/prediction/" + FLOWISE_ENIGME_ID,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
}

router.get('/flowise-enigme', async (_, res) => {
  try {
    const dataToSend = { question: "Hey, quelle est l enigme du jour ?" };
    const responseData = await query(dataToSend);
    const parsedText = JSON.parse(responseData.text);

    console.log("Énigme :", parsedText.enigme);
    console.log("Indice :", parsedText.indice);
    console.log("Réponse :", parsedText.reponse);

    res.json(parsedText);
  } catch (error) {
    console.error("Erreur:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
router.get('/', (req, res) => {
  res.send('Hello World from Enigmes Route!');
  
});



export default router;
