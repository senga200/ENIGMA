
![Titre](client/src/assets/titre.png)

🔮 http://vps-1b9fc044.vps.ovh.net:3003/ 🔮 


ENIGMA est une application web full‑stack qui permets de découvrir tous les jours une énigme différente et ce, grace à un agent IA.
Nous pouvons aussi créer un compte, afin de conserver les énigmes préférées.

<img src="https://raw.githubusercontent.com/senga200/ENIGMA/main/home.gif" alt="home" style="height:auto;" />

<img src="https://raw.githubusercontent.com/senga200/ENIGMA/main/enigmaFav.png" alt="favoris" style="height:auto;" />


- Le front est en React
- Le back en express JS
- le tout containerisé avec Docker sur une base de données Postgresql.
- Pour me faciliter la tâche, j’ai choisi de travailler avec l’ORM Sequelize (packages : sequelize, pg, pg-hstore).
- L'agent qui fourni tout ceci est créé par Flowise avec un LLM Mistral, qui lui aussi est containerisé. 
## Mis en prod sur mon VPS avec PM2 +nginx

screenshot de l'agent Flowise : 

<img src="https://raw.githubusercontent.com/senga200/ENIGMA/main/agent.png" alt="Agent" style="width:300px; height:auto;" />


Quick start 
```bash
# cloner
git clone https://github.com/senga200/ENIGMA.git
cd ENIGMA

# backend
npm ci
# créer .env (voir exemple ci‑dessous)
npm run dev    # écoute par défaut : http://localhost:3003

# frontend (dans /client)
cd client
npm ci
npm run dev    # Vite : http://localhost:5173
```

Exemples d'environnement
client/.env
```env
VITE_API_URL=http://localhost:3003
```

backend .env
```env
JWT_SECRET_KEY=your_jwt_secret_key
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
PORT=3003
```
