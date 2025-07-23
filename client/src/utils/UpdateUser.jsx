// update user : changer le mot de passe, email, supprimer le compte
export const updateEmail = async (userId, email) => {
  const res = await fetch(`http://localhost:3003/users/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  if (!res.ok) throw new Error('Erreur mise à jour email');
  return await res.json();
};


export const deleteUser = async (userId) => {
  const res = await fetch(`http://localhost:3003/users/${userId}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Erreur suppression compte');
  const text = await res.text();
  return text ? JSON.parse(text) : {};
};

