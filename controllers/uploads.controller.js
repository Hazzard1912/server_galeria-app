const { request, response } = require("express");
const { crearArchivo } = require("../helpers/crear-archivo");
const Galeria = require("../models/galeria");
const Usuario = require("../models/usuario");

const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const cargarArchivoCloudinary = async (req = request, res = response) => {
  const  usuarioId  = req.usuarioId;
  if (!usuarioId) {
    console.log("entra por aqui");
    return res.status(400).json({
      msg: "Solicitud denegada",
    });
  }

  const usuario = await Usuario.findOne({ where: { id: usuarioId } });
  if (!usuario) {
    return res.status(401).json({
      msg: "Solicitud denegada",
    });
  }
  try {
    const nombreArchivo = await crearArchivo(req.files, undefined);
    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    await Galeria.create({
      nombre: nombreArchivo,
      ruta: secure_url,
      usuarioId,
    });
    res.json({
      nombreArchivo,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      msg: error,
    });
  }
};

const mostrarGaleria = async (req = request, res = response) => {
  const usuarioId = req.usuarioId;
  if (!usuarioId) {
    return res.status(400).json({
      msg: "Solicitud denegada",
    });
  }

  const usuario = await Usuario.findOne({ where: { id: usuarioId } });
  if (!usuario) {
    return res.status(401).json({
      msg: "Solicitud denegada",
    });
  }

  const imagenes = await Galeria.findAll({
    where: { usuarioId },
    attributes: ["ruta"],
  });
  return res.status(200).json({
    imagenes,
  });
};

module.exports = {
  cargarArchivoCloudinary,
  mostrarGaleria,
};
