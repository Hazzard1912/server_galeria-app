const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  usuarioPost,
  validadoCorrectamente,
} = require("../controllers/usuario.controller");
const { existeEmail } = require("../helpers/db-validators");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.post(
  "/",
  [
    check("correo", "El correo no es valido").isEmail(),
    check("correo").custom(existeEmail),
    check(
      "password",
      "El password debe ser de minimo de 6 caracteres"
    ).isLength({
      min: 6,
    }),
    validarCampos,
  ],
  usuarioPost
);

router.get("/validate-token", validarJWT, validadoCorrectamente);

module.exports = router;
