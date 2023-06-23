const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");

const usuarioPost = async (req = request, res = response) => {
  const { correo, password } = req.body;

  try {
    const hashedPassword = bcryptjs.hashSync(password, 10);
    await Usuario.create({
      correo,
      password: hashedPassword,
    });

    return res.status(200).json({
      msg: "Usuario creado exitosamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: error.message,
    });
  }
};

const validadoCorrectamente = (req, res = response) => {
  return res.status(200).json({
    msg: "Token valido",
  });
};

module.exports = {
  usuarioPost,
  validadoCorrectamente,
};
