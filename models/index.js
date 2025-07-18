import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import defineEnigme from './enigme.js';
import defineUser from './user.js';

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

export { sequelize, Enigme, User };
