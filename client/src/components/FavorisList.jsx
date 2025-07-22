import React, { useEffect, useState } from 'react';
import { useUser } from '../utils/UserContext.jsx';
import { getFavorisByUser } from '../utils/GetFavoriByUser.jsx';

export default function FavorisList() {
  const { user, loading: userLoading } = useUser();
  const [favoris, setFavoris] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    async function fetchFavoris() {
      setLoading(true);
      const data = await getFavorisByUser(user.id);
      setFavoris(data);
      setLoading(false);
    }
    fetchFavoris();
  }, [user]);

  if (userLoading) return <p>Chargement utilisateur...</p>;
  if (loading) return <p>Chargement favoris...</p>;
  if (!favoris.length) return <p>Pas de favoris.</p>;

  return (
    <ul>
      {favoris.map((fav) => (
        <li key={`${fav.userId}-${fav.enigmeId}`}>
          {fav.Enigme?.enigme || "pas d'énigme disponible"}
        </li>
      ))}
    </ul>
  );
}
