const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/database");

const Galeria = sequelize.define(
  "Galeria",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ruta: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

const Usuario = require("./usuario");

Galeria.belongsTo(Usuario, {
  foreignKey: {
    name: "usuarioId",
    allowNull: false,
  },
});

module.exports = Galeria;
