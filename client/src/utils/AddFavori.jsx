
import { apiFetchJson } from './api';

async function addFavori(userId, enigmeId) {
  if (!userId || !enigmeId) return null;

  try {
    // apiFetchJson renvoie le JSON (ou null) et lève une erreur si status !ok
    const data = await apiFetchJson('/favoris/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, enigmeId })
    });

    return data; // JSON ou null si endpoint ne renvoie pas de JSON
  } catch (error) {
    console.error("Erreur lors de l'ajout du favori :", error);
    return null;
  }
}

export { addFavori };