async function getUsers() {
  try {
    const response = await fetch('http://localhost:3003/users/all', {
      method: 'GET',
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur serveur : ${response.status}`);
    }

    const users = await response.json();
    return users;

  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
    return [];
  }
}

export { getUsers };

