import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';

import { sequelize } from './models/index.js';
import { generateEnigmeForCron } from './controllers/enigmeController.js';
import cron from 'node-cron';

import routeEnigmes from './routes/routeEnigmes.js';
import routeUser from './routes/routeUser.js';
import routeAuth from './routes/routeAuth.js';
import routeFavoris from './routes/routeFavoris.js';


// dotenv.config({ override: true });
dotenv.config();

const app = express();
// app.use(cookieParser());
// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true,
// }));
// app.use(express.json());
// app.use('/enigmes', routeEnigmes);
// app.use('/users', routeUser);
// app.use('/auth', routeAuth);
// app.use('/favoris', routeFavoris);
const port = process.env.PORT || 3003;

// __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cookieParser());

// CORS 
// const allowedOrigins = [
//   'http://localhost:5173', // dev
//   `http://vps-1b9fc044.vps.ovh.net:${port}`, // prod avec port
//   'http://vps-1b9fc044.vps.ovh.net', // prod sans port
//   'http://51.38.186.158:3003',
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Non autorisé par CORS'));
//     }
//   },
//   credentials: true,
// }));
app.use(cors({
  origin: true, // Autorise toutes origines
  credentials: true,
}));


app.use(express.json());

// Routes API
app.use('/enigmes', routeEnigmes);
app.use('/users', routeUser);
app.use('/auth', routeAuth);
app.use('/favoris', routeFavoris);

// Fichiers statiques du frontend
app.use(express.static(path.join(__dirname, 'client/dist')));

// Route catch-all ALTERNATIVE - utiliser un middleware personnalisé
app.use((req, res, next) => {
  // Si c'est une route API qui n'existe pas, renvoyer 404
  if (req.path.startsWith('/enigmes') || 
      req.path.startsWith('/users') || 
      req.path.startsWith('/auth') || 
      req.path.startsWith('/favoris')) {
    return res.status(404).json({ error: 'API route not found' });
  }
  
  // Sinon, servir l'application React
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Serveur démarré sur http://0.0.0.0:${port}`);
  
  // sync db
  sequelize.sync({ alter: true })
    .then(() => {
      console.log("✅ Base de données synchronisée");
    })
    .catch((error) => {
      console.error("❌ Erreur de synchronisation de la base de données :", error);
    });

  // Test de la connexion à la base de données
  sequelize.authenticate()
    .then(() => {
      console.log("✅ Connexion à la base de données réussie");
    })
    .catch((error) => {
      console.error("❌ Impossible de se connecter à la base de données :", error);
    });
});

// Cron job pour générer une énigme chaque jour à minuit
cron.schedule('1 0 * * *', async () => {
  console.log('🕐 Génération automatique d\'énigme - ', new Date().toISOString());
  try {
    await generateEnigmeForCron();
    console.log('✅ Énigme générée et sauvegardée avec succès');
  } catch (error) {
    console.error('❌ Erreur lors de la génération automatique:', error);
  }
}, {
  scheduled: true,
  timezone: "Europe/Paris"
});