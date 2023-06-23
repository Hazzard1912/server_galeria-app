const Usuario = require("../models/usuario");

const existeEmail = async (correo = "") => {
  const existe = await Usuario.findOne({ where: { correo } });

  if (existe) {
    throw new Error(`El correo ${correo} ya esta registrado`);
  }
};

module.exports = {
  existeEmail,
};
