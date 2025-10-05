// app.js
const express = require('express');
const path = require('path');
const cineRouter = require('./routes/cine'); 

const app = express();
const port = 3000;

// Configuración de archivos estáticos (para CSS)
app.use(express.static('public'));

// Configuración de EJS como motor de plantillas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares: procesar JSON (para POST/PUT) y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Usar el enrutador de cine
app.use('/', cineRouter);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor de Cine corriendo en http://localhost:${port}`);
  console.log('--- RUTAS DE PRUEBA ---');
  console.log('Navegador: http://localhost:3000');
  console.log('REST Client: POST/PUT/DELETE http://localhost:3000/peliculas');
});