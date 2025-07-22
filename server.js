import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cron from 'node-cron';
import { generateEnigmeForCron } from './controllers/enigmeController.js';
import { sequelize } from './models/index.js';
import routeEnigmes from './routes/routeEnigmes.js';
import routeUser from './routes/routeUser.js';
import routeAuth from './routes/routeAuth.js';
import routeFavoris from './routes/routeFavoris.js';
import cookieParser from 'cookie-parser';

dotenv.config({ override: true });

const app = express();
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use('/enigmes', routeEnigmes);
app.use('/users', routeUser);
app.use('/auth', routeAuth);
app.use('/favoris', routeFavoris);

const port = process.env.PORT || 3003;


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Serveur démarré sur http://0.0.0.0:${port}`);

  // sync db
  sequelize.sync({ alter: true})
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
    }
  );
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
