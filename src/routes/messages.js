const express = require('express');
const router = express.Router();

// Simulación de base de datos de mensajes
const messages = [];

router.use((req, res, next) => {
  console.log(`Request method: ${req.method}, Request URL: ${req.originalUrl}`);
  next();
});

// Obtener todos los mensajes
router.get('/', (req, res) => {
  return res.json(messages);
});

// Obtener un mensaje específico por ID
router.get('/:messageId', (req, res, next) => {
  const { messageId } = req.params;
  const message = messages.find((msg) => messageId === msg.id);

  if (!message) {
    const error = new Error('Mensaje no encontrado.');
    error.status = 404;

    //Para el error al middleware general de manejo de errores
    return next(error);
  }

  return res.json(message);
});

// Agregar un nuevo mensaje
router.post('/', (req, res, next) => {
  const { message } = req.body;
  if (!message) {
    const error = new Error('No se ha encontrado la propiedad message');
    error.status = 404;
    //Para el error al middleware general de manejo de errores
    return next(error);
  }

  const newMessage = { id: `${messages.length + 1}`, message };
  messages.push(newMessage);
  return res.status(201).json(newMessage);
});

// Eliminar un mensaje por ID
router.delete('/:messageId', (req, res, next) => {
  const { messageId } = req.params;
  const index = messages.findIndex((msg) => msg.id === messageId);
  if (index === -1) {
    const error = new Error('Mensaje no encontrado.');
    error.status = 404;
    //Para el error al middleware general de manejo de errores
    return next(error);
  }

  messages.splice(index, 1);
  return res.send(`Mensaje con ID ${messageId} eliminado.`);
});

module.exports = router;
