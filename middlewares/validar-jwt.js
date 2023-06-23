const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJWT = async (req = request, res = response, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la peticion",
    });
  }

  try {
    const { usuario_id } = jwt.verify(token, process.env.SECRET);
    // Vemos si el usuario existe en la base de datos
    const usuario = await Usuario.findByPk(usuario_id);
    if (!usuario) {
      return res.status(401).json({
        msg: "Token no valido",
      });
    }
    req.usuarioId = usuario_id;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      msg: "Token no valido",
    });
  }
};

module.exports = {
  validarJWT,
};
