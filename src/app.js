require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

//-- Middlewares Globales
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importar las rutas
const messageRoutes = require('./routes/messages');

// Montamos las rutas para "/messages"
app.use('/messages', messageRoutes);

// Middleware de manejo de errores centralizado
app.use((err, req, res, next) => {
  console.error(err.stack); // Mostrar el error en la consola
  res.status(err.status || 500).json({
    message: err.message || "Error interno del servidor",
    error: process.env.NODE_ENV === "production" ? {} : err, // No exponer detalles de error en producción
  });
});

//-- Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
