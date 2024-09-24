// Importamos dotenv para cargar las variables de entorno
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Utilizamos la variable de entorno para el puerto
const port = process.env.PORT || 3000;

//console.log(process.env.USER);

app.use(cors());

app.get('/', (req, res) => {
  res.send('¡Hola, mundo desde Express!');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
