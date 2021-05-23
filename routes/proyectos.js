const express = require('express');
const router = express.Router();
const proyectoControler = require('../controller/proyectoController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

//Crea proyectos
//api/auth
router.post('/', 
auth,  //primero va a este 
[
    check('nombre','El nombre del proyecto es obligatorio').not().isEmpty()
],
proyectoControler.crearProyecto
); //luego a este ---nombre del controler 


router.get('/', 
auth,  //primero va a este y revisa que se este autenticado
proyectoControler.obtenerProyecto); //luego a este ---nombre del controler 


router.put('/:id', 
auth,  //primero va a este y revisa que se este autenticado
[
    check('nombre','El nombre del proyecto es obligatorio').not().isEmpty() //que el proyecto tenga un nombre
],
proyectoControler.actualizarProyecto); //luego a este ---nombre del controler 

router.delete('/:id', 
auth,  //primero va a este y revisa que se este autenticado
proyectoControler.eliminarProyecto); //luego a este ---nombre del controler 


module.exports = router;

