const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');
//server
const app = express();

//conectar db
conectarDB();

//habilitar cors
app.use(cors());

//Habilita express.jon
app.use(express.json({extended: true}));
//puerto de la app
const port = process.env.port || 4000;

//definir pagina principal

app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/proyectos',require('./routes/proyectos'));
app.use('/api/tareas',require('./routes/tareas'));


//arranca la app
app.listen(port,'0.0.0.0',()=>{
    console.log(`server running in port ${port}`)
});