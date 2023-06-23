const { Router } = require("express");
const { validarArchivo } = require("../middlewares/validar-archivo");
const {
  mostrarGaleria,
  cargarArchivoCloudinary,
} = require("../controllers/uploads.controller");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", validarJWT, mostrarGaleria);

router.post("/", [validarJWT, validarArchivo], cargarArchivoCloudinary);

module.exports = router;
