require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("snapserve", "root", process.env.db, {
  host: process.env.HOST,
  dialect: "mysql",
});

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
