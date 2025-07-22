import { Favori, Enigme } from "../models/index.js";

export const addFavori = async (req, res) => {
  const { userId, enigmeId } = req.body;
  if (!userId || !enigmeId) {
    return res.status(400).json({ error: "userId et enigmeId sont requis" });
  }
  try {
      const exists = await Favori.findOne({ where: { userId, enigmeId } });
    if (exists) {
      return res.status(409).json({ error: "Favori déjà existant" });
    }

    const newFavori = await Favori.create({ userId, enigmeId });
    res.status(201).json(newFavori);
  } catch (error) {
    res.status(500).json({ error: "Échec de l'ajout du favori" });
  }
};

export const deleteFavori = async (req, res) => {
  const { userId, enigmeId } = req.body;
  if (!userId || !enigmeId) {
    return res.status(400).json({ error: "userId et enigmeId sont requis" });
  }
  try {
    const deleted = await Favori.destroy({ where: { userId, enigmeId } });
    if (!deleted) {
      return res.status(404).json({ error: "Favori non trouvé" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Échec de la suppression du favori" });
  }
};

export const getFavorisByUser = async (req, res) => {
  const { userId } = req.params;
  console.log("Récupération des favoris pour l'utilisateur:", userId);
  try {
    const favoris = await Favori.findAll({
      where: { userId },
      include: [{ model: Enigme }],
    });
    console.log("Favoris trouvés:", favoris);
    res.status(200).json(favoris);
  } catch (error) {
    console.error("Erreur récupération favoris :", error);
  res.status(500).json({ error: "Échec de récupération des favoris" });
  }
};

