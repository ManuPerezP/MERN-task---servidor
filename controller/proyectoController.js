const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator");
const e = require("express");

exports.crearProyecto = async (req, res) => {
  try {
    //Crea un nuevo proyecto

    const errores = validationResult(req); //validar errores especificados en ruta

    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }

    const proyecto = new Proyecto(req.body);

    //Guardar el creador via JWT
    proyecto.creador = req.usuario.id;

    proyecto.save();
    res.json(proyecto);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error en crearProyecto");
  }
};
exports.obtenerProyecto = async (req, res) => {
  try {
    //trae todo lo que coincida con la condicion en parametros en este caso que el creador sea el id de usuario

    const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({
      creado: -1,
    });

    res.json({ proyectos });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error en crearProyecto");
  }
};

exports.actualizarProyecto = async (req, res) => {
  const errores = validationResult(req); //validar errores especificados en ruta

  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { nombre } = req.body;
  const nuevoProyecto = {};

  if (nombre) {
    nuevoProyecto.nombre = nombre;
  }

  try {
    //revisar el id
    let proyecto = await Proyecto.findById(req.params.id).catch((e) => {
      console.log(e);
    });
    //si el proyecto existe o no
    if (!proyecto) {
      //si no hay proyecto
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }
    //verificar el creador del proyecto
    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).send("No Autorizado"); //401: no permitodo
    }
    //actualizar
    proyecto = await Proyecto.findByIdAndUpdate(
      { _id: req.params.id }, //donde el _id sea el id enviado
      { $set: nuevoProyecto }, //lo nuevo
      { new: true }
    );

    res.json({ proyecto });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error en actualizarProyecto");
  }
};

exports.eliminarProyecto = async (req, res) => {
  try {
    //revisar el id
    let proyecto = await Proyecto.findById(req.params.id).catch((e) => {
      console.log(e);
    });
    //si el proyecto existe o no
    if (!proyecto) {
      //si no hay proyecto
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }
    //verificar el creador del proyecto
    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).send("No Autorizado"); //401: no permitodo
    }
    //eliminar el proyecto
    await Proyecto.findOneAndRemove({_id: req.params.id});

    res.json({msg: 'Proyecto eliminado!'});

  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error en eliminarProyecto");
  }
};
