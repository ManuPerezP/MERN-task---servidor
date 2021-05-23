//rutas para autenticar usuarios
const express = require("express");
const router = express.Router();
const { check } = require("express-validator"); //para validaciones
const authController = require('../controller/authController');
const auth = require('../middleware/auth');

//Valida un usuario
//api/auth
router.post(
  "/",
 /* [
    check("email", "Agrega un email válido").isEmail(),
    check("password", "El password debe ser minimo de 6 caracteres").isLength({
      min: 6,
    }),
  ],*/
  authController.autenticarUsuario //controller
);

router.get(
    "/",
    auth,  //primero va a este 
    authController.usuarioAutenticado //controller
  );

module.exports = router;


