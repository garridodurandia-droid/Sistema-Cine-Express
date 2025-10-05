// routes/cine.js
const express = require('express');
const router = express.Router();
const CineController = require('../controllers/CineController');

// Rutas de Vistas
router.get('/', (req, res) => res.render('index', { titulo: 'Sistema de Gestión de Cine' }));
router.get('/peliculas/nueva', CineController.mostrarFormularioPelicula);

// Endpoints GET (Lectura/Consulta)
router.get('/peliculas', CineController.listarPeliculas);        // 1. GET
router.get('/sesiones/recientes', CineController.mostrarSesionesRecientes); // 2. GET
router.get('/peliculas/:id', CineController.verDetallePelicula); // 3. GET

// Endpoints POST (Creación/Ingreso)
router.post('/peliculas', CineController.crearPelicula);         // 4. POST
router.post('/sesiones', CineController.crearSesion);           // 5. POST

// Endpoints PUT (Modificación/Edición)
router.put('/salas/:id', CineController.modificarSala);          // 6. PUT
router.put('/sesiones/:id/precio', CineController.modificarPrecioSesion); // 7. PUT

// Endpoints DELETE (Eliminación)
router.delete('/peliculas/:id', CineController.eliminarPelicula); // 8. DELETE

module.exports = router;