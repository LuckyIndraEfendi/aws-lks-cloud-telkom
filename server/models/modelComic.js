import { DataTypes, Sequelize } from "sequelize";
import dbConnection from "../config/dbConfig.js";

const Comic = dbConnection.define("comic", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  publisher: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Comic.sync({ force: false })
  .then(() => {
    console.log("Table comic created");
  })
  .catch((err) => {
    console.log(err);
  });

export default Comic;
