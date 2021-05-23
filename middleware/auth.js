const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
    //Leer el token del header
    const token = req.header('x-auth-token');

    //Revisar si no hay token
    if(!token){
        return res.status(401).json({msg: 'No hay Token, permiso no válido'});
    }

    try{
        const cifrado = jwt.verify(token,process.env.SECRETA);//retorna los datos del token decodificados si esta ok
        req.usuario = cifrado.usuario;
        next(); //se va al siguente middleware
    }catch(error){
        console.log(error);
        res.status(401).json({msg:'Token no válido'});
    }
}