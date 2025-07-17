import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fetch from 'node-fetch';

dotenv.config({ override: true });

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3003;

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

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/flowise-enigme', async (_, res) => {
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

app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Serveur démarré sur http://0.0.0.0:${port}`);






  // Test direct au démarrage du serveur (sans faire de requête HTTP) à supprimer quand il y aura le front
  (async () => {
    try {
      console.log("🚀 Test fetch Flowise au démarrage...");
      const testData = { question: "Hey, how are you?" };
      const responseData = await query(testData);
      const parsedText = JSON.parse(responseData.text);
      console.log("Test énigme au démarrage:", parsedText.enigme);
      console.log("Test indice au démarrage:", parsedText.indice);
      console.log("Test réponse au démarrage:", parsedText.reponse);
    } catch (error) {
      console.error("Erreur lors du test fetch au démarrage :", error);
    }
  })();
});
