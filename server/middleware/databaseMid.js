import { Sequelize } from "sequelize";
import dbConfig from "../config/dbConfig.js"; // Import your database configuration

const sequelize = new Sequelize(dbConfig);

// Middleware function to check database connection
const checkDatabaseConnection = async (req, res, next) => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    res.status(500).send("Database connection error.");
  }
};

export default checkDatabaseConnection;
