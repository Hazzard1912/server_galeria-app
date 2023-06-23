require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.NOMBRE_DB,
  process.env.NOMBRE_USUARIO,
  process.env.DB,
  {
    host: process.env.HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
  }
);

const connect = async () => {
  try {
    sequelize.authenticate();
    console.log("Base de datos conectada");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sequelize,
  connect,
};
