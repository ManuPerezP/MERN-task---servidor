const express = require('express');
const router = express.Router();
const tareasController = require('../controller/tareasController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

//crear una tarea
//api/tareas

router.post('/',
    auth,
    [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('proyecto','El proyecto es obligatorio').not().isEmpty()
    ],
    tareasController.crearTarea
);
//tareas por proyectos
router.get('/',
    auth,
    tareasController.obtenerTareas
);

//actualzar por proyectos
router.put('/:id',
    auth,
    [
        check('nombre','El nombre es obligatorio').not().isEmpty()
    ],
    tareasController.actualizarTarea
);

//actualzar por proyectos
router.delete('/:id',
    auth,
    tareasController.eliminarTarea
);

module.exports = router;