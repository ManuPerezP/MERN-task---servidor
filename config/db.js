const mongoose = require('mongoose');
require('dotenv').config({path:'variables.env'}); //carga archivo de variables de entorno

const conectarDB = async()=>{
    try{
        await mongoose.connect(process.env.DB_MONGO,{
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
        });
        console.log('.: Conectado a DB :.');
    }catch(error){
        console.log('No se puedo conectar');
        console.log(error);
        process.exit(1);// detiene la app
    }
}

module.exports = conectarDB;