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
const PORT = process.env.PORT || 4000;

//definir pagina principal

app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/proyectos',require('./routes/proyectos'));
app.use('/api/tareas',require('./routes/tareas'));

/*app.get('/',(req, res)=>{
    res.send('<h1>Hola manolito</h1>');
});*/

//arranca la app
app.listen(PORT,()=>{
    console.log(`server running in port ${PORT}`)
});