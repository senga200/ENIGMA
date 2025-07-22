async function getFavorisByUser(userId) {
  if (!userId) return [];
  try {
    const response = await fetch(`http://localhost:3003/favoris/user/${userId}`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error(`Erreur serveur : ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Erreur récupération favoris:', error);
    return [];
  }
}

export { getFavorisByUser };