import { Enigme } from '../models/index.js'; 
import fetch from 'node-fetch';



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

// Fonction pour le cron (sans req/res)
export async function generateEnigmeForCron() {
  try {
    console.log('FLOWISE_ENIGME_ID:', FLOWISE_ENIGME_ID);
    const dataToSend = { question: "Hey, quelle est l enigme du jour ?" };
    console.log('Données envoyées:', dataToSend);
    
    const responseData = await query(dataToSend);
    console.log('Réponse reçue:', responseData);
    
    const parsedText = JSON.parse(responseData.text);
    console.log('Texte analysé:', parsedText);

    const today = new Date().toISOString().split('T')[0];
    console.log(' Date du jour:', today);
    
    const newEnigme = await Enigme.create({
      enigme: parsedText.enigme,
      indice: parsedText.indice,
      reponse: parsedText.reponse,
      date: today,
    });
    
    console.log('🔍 Enigme créée:', newEnigme);
    return newEnigme;
  } catch (error) {
    console.error("❌ Erreur génération énigme cron:", error);
    throw error;
  }
}

// Fonction pour la route HTTP (avec req/res)
export async function generateAndSaveEnigme(req, res) {
  try {
    const result = await generateEnigmeForCron();
    res.status(201).json(result);
  } catch (error) {
    console.error("Erreur génération + sauvegarde énigme:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function getEnigmeDuJour(req, res) {
  try {
    const today = new Date().toISOString().split('T')[0];
    const enigmeDuJour = await Enigme.findOne({
      where: { date: today },
    });

    if (!enigmeDuJour) {
      return res.status(404).json({ error: "Aucune énigme trouvée pour aujourd'hui" });
    }

    res.status(200).json(enigmeDuJour);
  } catch (error) {
    console.error("Erreur récupération énigme du jour:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function getAllEnigmes(req, res) {
  try {
    const enigmes = await Enigme.findAll();
    res.status(200).json(enigmes);
  } catch (error) {
    console.error("Erreur récupération de toutes les énigmes:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function updateEnigme(req, res) {
  const { id } = req.params;
  const { enigme, indice, reponse } = req.body;

  try {
    const updatedEnigme = await Enigme.update(
      { enigme, indice, reponse },
      { where: { id } }
    );

    if (updatedEnigme[0] === 0) {
      return res.status(404).json({ error: "Énigme non trouvée" });
    }

    res.status(200).json({ message: "Énigme mise à jour avec succès" });
  } catch (error) {
    console.error("Erreur mise à jour énigme:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function deleteEnigme(req, res) {
  const { id } = req.params;

  try {
    const deletedCount = await Enigme.destroy({ where: { id } });

    if (deletedCount === 0) {
      return res.status(404).json({ error: "Énigme non trouvée" });
    }

    res.status(200).json({ message: "Énigme supprimée avec succès" });
  } catch (error) {
    console.error("Erreur suppression énigme:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}



