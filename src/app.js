require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { mongoose, Types: { ObjectId } } = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

//-- Middlewares Globales
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const urlDB = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017';

async function connectToDatabase() {
  try {
    //Conecta a mongo y a la base
    await mongoose.connect(urlDB);
    console.log('Conectado a la base de datos con mongoose');
    mongoose.connection.useDb(process.env.DATABASE || 'blog-messages');
    console.log(`Usando la base de datos`);

    // Importar el modelo de Message
    const Message = require('./models/message');

    // Middleware para inyectar el modelo en las rutas
    app.use((req, res, next) => {
      req.context = { models: { Message }, ObjectId };
      next();
    });

    // Importar las rutas de mensajes
    const messageRoutes = require('./routes/messages');
    app.use('/messages', messageRoutes);

    // Middleware de manejo de errores centralizado
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(err.status || 500).json({
        message: err.message || 'Error interno del servidor',
        error: process.env.NODE_ENV === 'production' ? {} : err,
      });
    });

    // Iniciar el servidor
    app.listen(port, () => {
      console.log(`Servidor escuchando en http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
  }
}

connectToDatabase();
