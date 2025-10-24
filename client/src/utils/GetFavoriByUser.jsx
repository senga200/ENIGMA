import { apiFetchJson } from './api';

async function getFavorisByUser(userId) {
  if (!userId) return [];
  try {
    // apiFetchJson renvoie le JSON parsé ou null et lance une erreur si status != ok
    const data = await apiFetchJson(`/favoris/user/${userId}`, {
      method: 'GET'
    });
    return data || [];
  } catch (error) {
    console.error('Erreur récupération favoris:', error);
    return [];
  }
}

export { getFavorisByUser };