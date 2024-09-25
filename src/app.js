require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb'); // Importamos mongodb

const app = express();
const port = process.env.PORT || 3000;

//-- Middlewares Globales
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar a MongoDB
const urlDB = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017';
const client = new MongoClient(urlDB);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Conectado a la base de datos');

    // Selecciona la base de datos y la colección de mensajes
    const db = client.db(process.env.DATABASE || 'blog-messages');
    const messagesCollection = db.collection('messages');

    // Middleware para inyectar la base de datos en las rutas
    app.use((req, res, next) => {
      req.context = { collections: { messages: messagesCollection }, ObjectId };
      next();
    });

    // Importamos y montamos las rutas
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

    //-- Iniciar el servidor
    app.listen(port, () => {
      console.log(`Servidor escuchando en http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
  }
}

connectToDatabase();
