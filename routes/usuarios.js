const express = require("express");
const router = express.Router();
const usuarioController = require("../controller/usuarioController");
const { check } = require("express-validator"); //para validaciones

//Crea un usuario
//api/usuarios
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(), //reglas de validacion
    check("email", "Agrega un email válido").isEmail(),
    check("password", "El password debe ser minimo de 6 caracteres").isLength({
      min: 6,
    }),
  ],
  usuarioController.crearUsuario
);

module.exports = router;


