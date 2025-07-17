import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fetch from 'node-fetch';
import { sequelize, Enigme } from './models/index.js';

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

  // sync db
  sequelize.sync({ force: false })
    .then(() => {
      console.log("✅ Base de données synchronisée");
    })
    .catch((error) => {
      console.error("❌ Erreur de synchronisation de la base de données :", error);
    });

  // Test de la connexion à la base de données
  sequelize.authenticate()
    .then(() => {
      console.log("✅ Connexion à la base de données réussie");
    })
    .catch((error) => {
      console.error("❌ Impossible de se connecter à la base de données :", error);
    }
  );

  // // Test de la connexion à Flowise
  // (async () => {
  //   try {
  //     console.log("🚀 Test fetch Flowise...");
  //     const testData = { question: "Hey, quelle est l enigme du jour ?" };
  //     const responseData = await query(testData);
  //     const parsedText = JSON.parse(responseData.text);
  //     console.log("Énigme :", parsedText.enigme);
  //     console.log("Indice :", parsedText.indice);
  //     console.log("Réponse :", parsedText.reponse);
  //   } catch (error) {
  //     console.error("Erreur lors du test fetch :", error);
  //   }
  // })();
  // // Test de la création d'une énigme dans la base de données
  // (async () => {
  //   try {
  //     const enigme = await Enigme.create({
  //       question: "Quelle est la capitale de la France ?",
  //       indice: "C'est une ville romantique.",
  //       reponse: "Paris"
  //     });
  //     console.log("✅ Énigme créée :", enigme.toJSON());
  //   } catch (error) {
  //     console.error("❌ Erreur lors de la création de l'énigme :", error);
  //   }
  // })();

  // // Test de la récupération de toutes les énigmes
  // (async () => {
  //   try {
  //     const enigmes = await Enigme.findAll();
  //     console.log("✅ Énigmes récupérées :", enigmes.map(e => e.toJSON()));
  //   } catch (error) {
  //     console.error("❌ Erreur lors de la récupération des énigmes :", error);
  //   }
  // })();

  // // Test de la récupération d'une énigme spécifique
  // (async () => {
  //   try {
  //     const enigme = await Enigme.findOne({ where: { question: "Quelle est la capitale de la France ?" } });
  //     if (enigme) {
  //       console.log("✅ Énigme trouvée :", enigme.toJSON());
  //     } else {
  //       console.log("❌ Aucune énigme trouvée avec cette question.");
  //     }
  //   } catch (error) {
  //     console.error("❌ Erreur lors de la récupération de l'énigme :", error);
  //   }
  // })();

  // // Test de la mise à jour d'une énigme
  // (async () => {  
  //   try {
  //     const [updated] = await Enigme.update(
  //       { reponse: "Paris, la ville lumière" },
  //       { where: { question: "Quelle est la capitale de la France ?" } }
  //     );
  //     if (updated) {
  //       console.log("✅ Énigme mise à jour avec succès");
  //     } else {
  //       console.log("❌ Aucune énigme trouvée à mettre à jour.");
  //     }
  //   } catch (error) {
  //     console.error("❌ Erreur lors de la mise à jour de l'énigme :", error);
  //   }
  // })();

  // // Test de la suppression d'une énigme
  // (async () => {
  //   try {
  //     const deleted = await Enigme.destroy({ where: { question: "Quelle est la capitale de la France ?" } });
  //     if (deleted) {
  //       console.log("✅ Énigme supprimée avec succès");
  //     } else {
  //       console.log("❌ Aucune énigme trouvée à supprimer.");
  //     }
  //   } catch (error) {
  //     console.error("❌ Erreur lors de la suppression de l'énigme :", error);
  //   }
  // })(); 


  






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
