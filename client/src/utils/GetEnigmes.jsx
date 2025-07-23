
async function getEnigmes() {
  try {
    const response = await fetch('http://localhost:3003/enigmes/all', {
      method: 'GET',
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur serveur : ${response.status}`);
    }

    const enigmes = await response.json();
    return enigmes;

  } catch (error) {
    console.error('Erreur lors de la récupération des énigmes :', error);
    return [];
  }
}

export { getEnigmes };


