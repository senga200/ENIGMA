async function deleteFavorisByUser(userId, enigmeId) {
  if (!userId || !enigmeId) return;

  try {
    const response = await fetch(`http://localhost:3003/favoris/deleteFavori`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, enigmeId })
    });

    if (!response.ok) {
      throw new Error(`Erreur serveur : ${response.status}`);
    }

    // parse du JSON que si une réponse est attendue
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      return null; 
    }

  } catch (error) {
    console.error('Erreur suppression favoris:', error);
  }
}


export { deleteFavorisByUser };