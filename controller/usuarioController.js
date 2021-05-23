const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.crearUsuario = async (req, res) => {
  const errores = validationResult(req); //validar errores especificados en ruta

  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { email, password } = req.body;
  try {
    //revisar que sea unico

    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({ msg: "El Usuario ya existe" });
    }

    //crea el nuevo usuario
    usuario = new Usuario(req.body);
    //hash password
    const salt = await bcryptjs.genSalt(10); //por si hay dos usuarios con la misma clave, genera hash diferente para la misma clave (salt)

    usuario.password = await bcryptjs.hash(password, salt);

    //guardar usuario
    await usuario.save();

    /*
    header: tipo de jwt y algoritmo
    payload: información de la entidad y datos adicionales
    signature: o firma ... verifica que el mensaje no ha cambiado en su transporte
*/

    //crea y firma el jwt
    const payload = {
            usuario:{
                id: usuario.id
            }
    };

    //firmar el jwt
    jwt.sign(payload, process.env.SECRETA,{
        expiresIn: 3600//1 hora
    },(error, token)=>{
        if(error) throw error;
        return res.json({token});
    });

  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};
