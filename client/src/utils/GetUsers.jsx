import { apiFetchJson } from './api';

async function getUsers() {
  try {
    const users = await apiFetchJson('/users/all', { method: 'GET' });
    return users || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
    return [];
  }
}

export { getUsers };