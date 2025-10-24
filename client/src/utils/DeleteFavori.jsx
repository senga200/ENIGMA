import { apiFetchJson } from './api';

async function deleteFavorisByUser(userId, enigmeId) {
  if (!userId || !enigmeId) return null;

  try {
    // apiFetchJson lèvera une erreur si status n'est pas ok et retournera le JSON (ou null)
    const data = await apiFetchJson('/favoris/deleteFavori', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, enigmeId })
    });

    return data; // JSON ou null si pas de JSON retourné (ex: 204)
  } catch (error) {
    console.error('Erreur suppression favoris:', error);
    return null;
  }
}

export { deleteFavorisByUser };