const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
  console.log(`Request method: ${req.method}, Request URL: ${req.originalUrl}`);
  next();
});

// Obtener todos los mensajes
router.get('/', async (req, res, next) => {
  try {
    const messages = await req.context.models.Message.find();
    return res.json(messages);
  } catch (er) {
    const error = new Error(
      'Error al obtener los mensajes de la base de datos'
    );
    error.status = 500;
    return next(error);
  }
});

// Obtener un mensaje específico por ID
router.get('/:messageId', async (req, res, next) => {
  const { messageId } = req.params;
  try {
    if (!req.context.ObjectId.isValid(messageId)) {
      const error = new Error(`ID ${messageId} no es válido`);
      error.status = 400;
      return next(error);
    }

    const myid = new req.context.ObjectId(messageId);
    const message = await req.context.models.Message.findOne({
      _id: myid,
    });

    console.log('---',message)

    if (!message) {
      const error = new Error(`Mensaje con ID ${messageId} no encontrado`);
      error.status = 404;
      return next(error);
    }

    return res.json(message);
  } catch (er) {
    const error = new Error(
      `Error al obtener el mensaje con ID ${messageId} desde la base de datos`
    );
    error.status = 500;
    return next(error);
  }
});

// Agregar un nuevo mensaje
router.post('/', async (req, res, next) => {
  try {
    const { message } = req.body;

    if (!message) {
      const error = new Error('La propiedad "message" es requerida');
      error.status = 404;
      return next(error);
    }

    // Crear el nuevo mensaje
    const newMessage = new req.context.models.Message({ message });
    const savedMessage = await newMessage.save();

    // Validar si la inserción fue exitosa
    if (!savedMessage) {
      const error = new Error('Error al guardar el mensaje');
      error.status = 500;
      return next(error);
    }

    return res.status(201).json(savedMessage);
  } catch (er) {
    const error = new Error('Error al agregar el mensaje a la base de datos');
    error.status = 500;
    return next(error);
  }
});

// Eliminar un mensaje por ID
router.delete('/:messageId', async (req, res, next) => {
  const { messageId } = req.params;

  try {
    if (!req.context.ObjectId.isValid(messageId)) {
      const error = new Error(`ID ${messageId} no es válido`);
      error.status = 400;
      return next(error);
    }

    const myid = new req.context.ObjectId(messageId);
    // Buscar y eliminar el mensaje
    const result = await req.context.models.Message.deleteOne({
      _id: myid,
    });

    if (result.deletedCount === 0) {
      const error = new Error(`Mensaje con ID ${messageId} no encontrado`);
      error.status = 404;
      return next(error);
    }

    return res.send(`Mensaje con ID ${messageId} eliminado.`);
  } catch (err) {
    return next(
      new Error(
        `Error al eliminar el mensaje de la base de datos con ID ${messageId}`
      )
    );
  }
});

module.exports = router;
