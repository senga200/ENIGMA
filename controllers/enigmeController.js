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

export async function generateAndSaveEnigme(req, res) {
  try {
     console.log('Début de generateAndSaveEnigme');
    console.log('FLOWISE_ENIGME_ID:', FLOWISE_ENIGME_ID);
    const dataToSend = { question: "Hey, quelle est l enigme du jour ?" };
        console.log('Données envoyées:', dataToSend);
    const responseData = await query(dataToSend);
     console.log('Réponse reçue:', responseData);
    const parsedText = JSON.parse(responseData.text);
    console.log('Texte analysé:', parsedText);

    const today = new Date().toISOString().split('T')[0];
        console.log('Date du jour:', today);
    const newEnigme = await Enigme.create({
      enigme: parsedText.enigme,
      indice: parsedText.indice,
      reponse: parsedText.reponse,
      date: today,
    });

    res.status(201).json(newEnigme);
  } catch (error) {
    console.error("Erreur génération + sauvegarde énigme:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}


