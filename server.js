import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { sequelize } from './models/index.js';
import routeEnigmes from './routes/routeEnigmes.js';

dotenv.config({ override: true });

const app = express();
app.use(cors());
app.use(express.json());
app.use('/enigmes', routeEnigmes);
const port = process.env.PORT || 3003;


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Serveur démarré sur http://0.0.0.0:${port}`);

  // sync db
  sequelize.sync({ force: false })
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
