const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req = request, res = response) => {
  const { correo, password } = req.body;
    console.log(correo, password);
  try {
    const usuario = await Usuario.findOne({
      where: { correo },
    });

    if (!usuario) {
      return res.status(400).json({
        msg: "Correo / Password no son correctos",
      });
    }

    const validPassword = bcryptjs.compareSync(password, usuario.password);
    
    if (!validPassword) {
      return res.status(400).json({
        msg: "Correo / Password no son correctos",
      });
    }

    const token = await generarJWT(usuario.id);

    return res.json({
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

module.exports = {
  login,
};
