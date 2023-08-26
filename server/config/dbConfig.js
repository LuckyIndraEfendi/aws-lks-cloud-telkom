import { Sequelize } from "sequelize";
import { configDotenv } from "dotenv";
configDotenv();

const dbConnection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

export default dbConnection;
