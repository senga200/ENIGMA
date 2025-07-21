import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
    // Récupération de l'utilisateur connecté
    // Utilisation de useEffect pour charger l'utilisateur au démarrage


useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/auth/me', {
          credentials: 'include' //envoyer les cookies
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de l’utilisateur:', error);
        setUser(null);
      } finally {
        setLoading(false); // Fin du chargement
      }
    };
    fetchUser();
  }, []);



  const login = (userData) => {
    setUser(userData); // vide si link auth/me après login
  };
  const logout = async () => {
    try {
      await fetch('/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    } finally {
      setUser(null); 
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook pratique
export function useUser() {
  return useContext(UserContext);
}
