// controllers/CineController.js
const { peliculas, sesiones, salas } = require('../data/cineData');

class CineController {
    
    // RUTA DE APOYO
    static mostrarFormularioPelicula(req, res) {
        res.render('formularioPelicula', { titulo: 'Ingresar Nueva Película' });
    }
    
    // --- MÉTODOS GET (LECTURA/CONSULTA) ---

    // 1. GET /peliculas (Listar todos)
    static listarPeliculas(req, res) {
        res.render('peliculas', { titulo: 'Catálogo de Películas', peliculas: peliculas });
    }

    // 2. GET /sesiones/recientes (Mostrar los últimos 5 elementos, ordenados por fecha)
    static mostrarSesionesRecientes(req, res) {
        // Ordena por fecha y hora (criterio de ordenamiento) y toma los 5 más próximos.
        const recientes = sesiones
            .sort((a, b) => new Date(`${a.fecha} ${a.horaInicio}`) - new Date(`${b.fecha} ${b.horaInicio}`))
            .slice(0, 5);
        
        res.render('sesionesRecientes', { 
            titulo: 'Próximas 5 Sesiones', 
            sesiones: recientes 
        });
    }
    
    // 3. GET /peliculas/:id (Mostrar elemento por id)
    static verDetallePelicula(req, res) {
        const id = parseInt(req.params.id);
        const pelicula = peliculas.find(p => p.id === id);
        
        if (!pelicula) {
            return res.status(404).json({ mensaje: "Película no encontrada" });
        }
        res.render('peliculaDetalle', { titulo: `Detalle de ${pelicula.titulo}`, pelicula });
    }

    // --- MÉTODOS POST (CREACIÓN) ---

    // 4. POST /peliculas (Crear/Ingresar datos a entidad)
    static crearPelicula(req, res) {
        const nuevaPelicula = { 
            id: peliculas.length > 0 ? peliculas[peliculas.length - 1].id + 1 : 1, 
            ...req.body
        };
        peliculas.push(nuevaPelicula); 
        res.status(201).json({ mensaje: "✅ Película creada exitosamente", pelicula: nuevaPelicula });
    }

    // 5. POST /sesiones (Relacionar y crear)
    static crearSesion(req, res) {
        const { id_pelicula, id_sala, fecha, horaInicio, precio } = req.body;

        // Verifica si existen la película y la sala (Cumple: Relacionar de forma adecuada)
        const peliculaExiste = peliculas.some(p => p.id == id_pelicula);
        const salaExiste = salas.some(s => s.id == id_sala);
        
        if (!peliculaExiste || !salaExiste) {
             return res.status(400).json({ mensaje: "Error: La Película o Sala relacionada no existe." });
        }

        const nuevaSesion = {
            id: sesiones.length + 101, 
            id_pelicula: parseInt(id_pelicula),
            id_sala: parseInt(id_sala),
            fecha,
            horaInicio,
            precio: parseFloat(precio)
        };
        sesiones.push(nuevaSesion);
        res.status(201).json({ mensaje: "✅ Sesión creada y relacionada", sesion: nuevaSesion });
    }

    // --- MÉTODOS PUT (MODIFICACIÓN/EDICIÓN) ---

    // 6. PUT /salas/:id (Modificar datos de entidad)
    static modificarSala(req, res) {
        const id = parseInt(req.params.id);
        const index = salas.findIndex(s => s.id === id);

        if (index === -1) {
            return res.status(404).json({ mensaje: "Sala no encontrada" });
        }
        salas[index] = { ...salas[index], ...req.body }; // Modifica datos
        res.json({ mensaje: "✍️ Sala modificada", sala: salas[index] });
    }
    
    // 7. PUT /sesiones/:id/precio (Modificar campo específico)
    static modificarPrecioSesion(req, res) {
        const id = parseInt(req.params.id);
        const index = sesiones.findIndex(s => s.id === id);

        if (index === -1) {
            return res.status(404).json({ mensaje: "Sesión no encontrada" });
        }
        
        if (req.body.precio === undefined) {
             return res.status(400).json({ mensaje: "Se requiere el campo 'precio' para modificar." });
        }
        
        sesiones[index].precio = parseFloat(req.body.precio); 
        res.json({ mensaje: "💰 Precio de sesión modificado", sesion: sesiones[index] });
    }

    // --- MÉTODOS DELETE (ELIMINACIÓN) ---

    // 8. DELETE /peliculas/:id (Eliminar elemento)
    static eliminarPelicula(req, res) {
        const id = parseInt(req.params.id);
        const index = peliculas.findIndex(p => p.id === id);

        if (index === -1) {
            return res.status(404).json({ mensaje: "Película no encontrada para eliminar" });
        }
        
        peliculas.splice(index, 1); // Eliminar elemento de entidad
        
        res.json({ mensaje: `🗑️ Película con ID ${id} eliminada` });
    }
}

module.exports = CineController;