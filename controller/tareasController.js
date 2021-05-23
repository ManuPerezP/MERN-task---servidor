const Tarea = require("../models/Tarea");
const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator");

exports.crearTarea = async (req, res) => {
  const errores = validationResult(req); //validar errores especificados en ruta

  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //

  try {
    const { proyecto } = req.body;

    const existeProyecto = await Proyecto.findById(proyecto);

    if (!existeProyecto) {
      return res.status(404).json({ msg: "Id de proyecto no encontrado" });
    }

    //revisar que el proyecto pertenece al usuario autenticado
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).send("No Autorizado"); //401: no permitodo
    }

    const tarea = new Tarea(req.body);
    await tarea.save();
    
    res.json({ tarea });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Hubo un error" });
  }
};

exports.obtenerTareas = async (req, res) => {
  try {
    const { proyecto } = req.query;

    console.log(proyecto);

    const existeProyecto = await Proyecto.findById(proyecto);

    if (!existeProyecto) {
      return res.status(404).json({ msg: "Id de proyecto no encontrado" });
    }

    //revisar que el proyecto pertenece al usuario autenticado
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).send("No Autorizado"); //401: no permitodo
    }

    const tareas = await Tarea.find({ proyecto: proyecto }).sort({
      creado: -1,
    });

    res.json({ tareas });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error en obtenerTareas");
  }
};

exports.actualizarTarea = async (req, res) => {
  try {
    //extraer el proyecto
    const { proyecto, nombre, estado } = req.body;

    let tarea = await Tarea.findById(req.params.id);

    if (!tarea) {
      return res.status(404).json({ msg: "No existe esa tarea" });
    }

    const proyectoDB = await Proyecto.findById(proyecto);

    //revisar que el proyecto pertenece al usuario autenticado
    if (proyectoDB.creador.toString() !== req.usuario.id) {
      return res.status(401).send("No Autorizado"); //401: no permitodo
    }

    //crear objeto nuevo:

    const nuevaTarea = {};

    nuevaTarea.nombre = nombre;
    nuevaTarea.estado = estado;

    //guardar tarea
    tarea = await Tarea.findOneAndUpdate({ _id: req.params.id }, nuevaTarea, {
      new: true,
    });
    res.json({ tarea });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error en obtenerTareas");
  }
};

exports.eliminarTarea = async (req, res) => {
  try {
    const { proyecto } = req.query; //nombre tiene que coincidir con el enviado por delete

    let tareaExiste = await Tarea.findById(req.params.id);

    if (!tareaExiste) {
      return res.status(404).json({ msg: "No existe esa tarea" });
    }

    const proyectoDB = await Proyecto.findById(proyecto);

    //revisar que el proyecto pertenece al usuario autenticado
    if (proyectoDB.creador.toString() !== req.usuario.id) {
      return res.status(401).send("No Autorizado"); //401: no permitodo
    }

    //eliminar el proyecto
    await Tarea.findOneAndRemove({ _id: req.params.id });

    res.json({ msg: "Tarea eliminada!" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error en obtenerTareas");
  }
};
