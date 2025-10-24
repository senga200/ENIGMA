import { apiFetchJson, apiFetch } from './api';

const updateEmail = async (userId, email) => {
  try {
    const data = await apiFetchJson(`/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    return data;
  } catch (err) {
    throw new Error(err.message || 'Erreur mise à jour email');
  }
};

const deleteUser = async (userId) => {
  try {
    const res = await apiFetch(`/users/${userId}`, {
      method: 'DELETE'
    });

    if (!res.ok) {
      throw new Error(`Erreur suppression compte : ${res.status}`);
    }

    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      return await res.json();
    }

    const text = await res.text();
    return text ? JSON.parse(text) : {};
  } catch (err) {
    throw new Error(err.message || 'Erreur suppression compte');
  }
};

const updatePassword = async (userId, oldPassword, newPassword) => {
  try {
    const data = await apiFetchJson(`/users/${userId}/change-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ oldPassword, newPassword })
    });
    return data;
  } catch (err) {
    throw new Error(err.message || 'Erreur mise à jour mot de passe');
  }
};

export { updateEmail, deleteUser, updatePassword };