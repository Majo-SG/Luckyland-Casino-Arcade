// seedData.js
// Ejecutar con: mongosh casino_db scripts/seedData.js
//
// Inserta datos de ejemplo. Guardamos los _id generados en variables
// para poder crear las referencias (jugadorId, actividadId, premioId)
// correctamente entre colecciones.

// --- 1. Jugadores ---
const jugadores = db.jugadores.insertMany([
  { nombre: "Ana Torres",    fichas: 500, fechaRegistro: new Date("2026-06-01") },
  { nombre: "Luis Ramírez",  fichas: 300, fechaRegistro: new Date("2026-06-05") },
  { nombre: "Sofía Medina",  fichas: 800, fechaRegistro: new Date("2026-06-10") }
]).insertedIds;

// --- 2. Actividades ---
const actividades = db.actividades.insertMany([
  { nombre: "Ruleta",                    tipo: "mesa",    costoEntrada: 20 },
  { nombre: "Blackjack",                 tipo: "mesa",    costoEntrada: 25 },
  { nombre: "Máquina tragamonedas #1",   tipo: "maquina", costoEntrada: 10 },
  { nombre: "Pac-Man arcade",            tipo: "maquina", costoEntrada: 5  }
]).insertedIds;

// --- 3. Premios ---
const premios = db.premios.insertMany([
  { nombre: "Taza del casino",     costoFichas: 100 },
  { nombre: "Gorra Arcade",        costoFichas: 150 },
  { nombre: "Cena para 2 personas", costoFichas: 400 }
]).insertedIds;

// --- 4. Partidas (relaciona jugadores + actividades) ---
db.partidas.insertMany([
  { jugadorId: jugadores[0], actividadId: actividades[0], fichasGanadas: 50,  fecha: new Date("2026-07-01") },
  { jugadorId: jugadores[0], actividadId: actividades[2], fichasGanadas: -10, fecha: new Date("2026-07-02") },
  { jugadorId: jugadores[1], actividadId: actividades[1], fichasGanadas: -25, fecha: new Date("2026-07-01") },
  { jugadorId: jugadores[1], actividadId: actividades[3], fichasGanadas: 15,  fecha: new Date("2026-07-03") },
  { jugadorId: jugadores[2], actividadId: actividades[0], fichasGanadas: 120, fecha: new Date("2026-07-04") },
  { jugadorId: jugadores[2], actividadId: actividades[1], fichasGanadas: -25, fecha: new Date("2026-07-05") }
]);

// --- 5. Canjes (relaciona jugadores + premios) ---
db.canjes.insertMany([
  { jugadorId: jugadores[0], premioId: premios[0], fecha: new Date("2026-07-06") },
  { jugadorId: jugadores[2], premioId: premios[2], fecha: new Date("2026-07-07") }
]);

print("Datos de ejemplo insertados correctamente.");
