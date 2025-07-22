import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import defineEnigme from './enigme.js';
import defineUser from './user.js';
import defineFavori from './favori.js';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
  }
);

const Enigme = defineEnigme(sequelize, Sequelize.DataTypes);
const User = defineUser(sequelize, Sequelize.DataTypes);
const Favori = defineFavori(sequelize, Sequelize.DataTypes);



// Associations
User.belongsToMany(Enigme, {
  through: Favori,
  foreignKey: 'userId',
  otherKey: 'enigmeId',
});
Enigme.belongsToMany(User, {
  through: Favori,
  foreignKey: 'enigmeId',
  otherKey: 'userId',
});


// Associations directes nécessaires pour l'include via Favori
Favori.belongsTo(Enigme, { foreignKey: 'enigmeId' });
Favori.belongsTo(User, { foreignKey: 'userId' });

export { sequelize, Enigme, User, Favori };