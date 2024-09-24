# API CRUD con Node.js, Express, MongoDB y Variables de Entorno

Este proyecto es un ejemplo básico de cómo construir un conjunto de APIs para gestionar mensajes con operaciones CRUD (Create, Read, Update, Delete). Utilizamos Node.js como entorno de ejecución, Express como framework para la creación de las APIs, MongoDB para la persistencia de datos, y configuramos variables de entorno mediante un archivo .env para que la aplicación pueda adaptarse a diferentes entornos sin necesidad de modificar el código.

## Versiones

- [0.1.0](https://github.com/mauriciogc/men-server-blog/tree/0.1.0) - Configurando Nodemon, Babel, Express, CORS y Variables de Entorno (.env)

## Funcionalidades

- Crear, leer, actualizar y eliminar mensajes (CRUD).
- Uso de MongoDB para almacenar los datos.
- Configuración de variables de entorno usando el paquete dotenv.
- Automatización del reinicio del servidor con Nodemon.
- Compatibilidad con las últimas características de JavaScript mediante Babel.
- Configuración de CORS para permitir peticiones desde diferentes dominios.

## Requisitos

- Node.js instalado.
- MongoDB configurado y ejecutándose.

## Instalación

1. Clona este repositorio:

```bash
https://github.com/mauriciogc/men-server-blog.git
cd men-server-blog
```

2. Instala las dependencias del proyecto:

```bash
npm install
```

3. Crea un archivo .env en la raíz del proyecto y define las siguientes variables de entorno:

```bash
PORT=3000
```

4. Para asegurarte de que el archivo .env no se sube al repositorio, añade la siguiente línea en el archivo .gitignore:

```bash
.env
```

5. Ejecuta el servidor en modo desarrollo (con Nodemon y Babel):

```bash
npm start
```

El servidor se ejecutará en http://localhost:3000.

## Estructura del Proyecto

```bash
/express/blog-em
    /src
      app.js
    .env
    .gitignore
    package.json
```

- `src/app.js`: Contiene la lógica principal de la aplicación y las rutas de las APIs.
- `.env`: Archivo donde se definen las variables de entorno (ignorado por Git).
- `package.json`: Contiene las dependencias y los scripts del proyecto.

## Uso

1. Abre tu navegador o herramienta como Postman para hacer peticiones a la API.
2. Las rutas disponibles son:
   - `GET /`: Devuelve un mensaje de prueba.

## Tecnologías Utilizadas

- Node.js: Entorno de ejecución de JavaScript.
- Express: Framework para el desarrollo de APIs.
- MongoDB: Base de datos NoSQL para almacenar los mensajes.
- Nodemon: Herramienta para reiniciar el servidor automáticamente en desarrollo.
- Babel: Compilador de JavaScript moderno.
- CORS: Permitir solicitudes entre dominios.
- dotenv: Carga de variables de entorno desde un archivo .env.
