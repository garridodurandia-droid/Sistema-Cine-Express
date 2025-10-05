// data/cineData.js
const peliculas = [
    { id: 1, titulo: "Una Pelicula de Minecraft", genero: "Comedia", duracion: 101, fechaEstreno: "04-04-2025", clasificacion: "A" },
    { id: 2, titulo: "Como Entrenar a tu Dragon", genero: "Fantasia/Aventura", duracion: 125, fechaEstreno: "13-06-2025", clasificacion: "A" },
    { id: 3, titulo: "Destino Final: Lazos de Sangre", genero: "Terror", duracion: 110, fechaEstreno: "16-05-2025", clasificacion: "C" },
    { id: 4, titulo: "Mision Imposible - Dead Reckoning Part Two", genero: "Accion/Suspenso", duracion: 169, fechaEstreno: "21-05-2025", clasificacion: "B" },
    { id: 5, titulo: "La Hora de la Desaparicion", genero: "Terror/Misterio", duracion: 128, fechaEstreno: "08-08-2025", clasificacion: "C" },
];

const salas = [
    { id: 1, nombre: "Sala Estándar 1", capacidad: 100, tipo: "2D" },
    { id: 2, nombre: "Sala VIP Doble", capacidad: 50, tipo: "VIP" },
    { id: 3, nombre: "Sala 3", capacidad: 70, tipo: "3D" }
];

// Datos de sesiones ordenados por fecha/hora para probar el GET/recientes
const sesiones = [
    { id: 101, id_pelicula: 1, id_sala: 3, fecha: "16-09-2025", horaInicio: "14:00", precio: 3.00 },
    { id: 102, id_pelicula: 2, id_sala: 1, fecha: "16-09-2025", horaInicio: "16:00", precio: 3.00 },
    { id: 103, id_pelicula: 3, id_sala: 2, fecha: "17-09-2025", horaInicio: "20:00", precio: 5.00 },
    { id: 104, id_pelicula: 4, id_sala: 2, fecha: "18-09-2025", horaInicio: "18:00", precio: 5.00 },
    { id: 105, id_pelicula: 5, id_sala: 1, fecha: "18-09-2025", horaInicio: "19:00", precio: 3.50 },
];

module.exports = { peliculas, salas, sesiones };