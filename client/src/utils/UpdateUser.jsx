const updateEmail = async (userId, email) => {
  const res = await fetch(`http://localhost:3003/users/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  if (!res.ok) throw new Error('Erreur mise à jour email');
  return await res.json();
};

const deleteUser = async (userId) => {
  const res = await fetch(`http://localhost:3003/users/${userId}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Erreur suppression compte');
  const text = await res.text();
  return text ? JSON.parse(text) : {};
};

const updatePassword = async (userId, oldPassword, newPassword) => {
  const res = await fetch(`http://localhost:3003/users/${userId}/change-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ oldPassword, newPassword })
  });
  if (!res.ok) throw new Error('Erreur mise à jour mot de passe');
  return await res.json();
};

export { updateEmail, deleteUser, updatePassword };


