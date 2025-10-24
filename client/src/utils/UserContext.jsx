import { createContext, useContext, useState, useEffect } from 'react';
import { apiFetch, apiFetchJson } from './api';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Récupération de l'utilisateur connecté au démarrage
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // apiFetchJson : erreur si status != ok et renvoie le JSON parsé sinon
        const userData = await apiFetchJson('/auth/me', { method: 'GET' });
        setUser(userData);
        if (userData?.createdAt) {
          console.log('Utilisateur récupéré:', userData);
          console.log('date de création:', new Date(userData.createdAt).toLocaleDateString());
        }
      } catch (error) {
        // si erreur, on remet user à null
        console.error('Erreur lors de la récupération de l’utilisateur:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = (userData) => {
    setUser(userData); // met à jour le contexte après connexion
  };

  const logout = async () => {
    try {
      await apiFetch('/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    } finally {
      setUser(null);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}