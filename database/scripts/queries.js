// queries.js
// Ejecutar con: mongosh casino_db scripts/queries.js
//
// La rúbrica pide mínimo 2 consultas que reflejen relaciones entre
// colecciones, especificando su objetivo. Aquí van esas dos, usando
// $lookup (el equivalente en MongoDB a un JOIN de SQL).

// --------------------------------------------------------------------
// CONSULTA 1
// Objetivo: obtener el historial de partidas de cada jugador, mostrando
// el NOMBRE del jugador y el NOMBRE de la actividad (no solo los IDs),
// para poder mostrarlo directamente en el frontend.
// Relación explotada: partidas -> jugadores, partidas -> actividades
// --------------------------------------------------------------------
print("=== Consulta 1: historial de partidas con nombre de jugador y actividad ===");
db.partidas.aggregate([
  {
    $lookup: {
      from: "jugadores",
      localField: "jugadorId",
      foreignField: "_id",
      as: "jugador"
    }
  },
  { $unwind: "$jugador" },
  {
    $lookup: {
      from: "actividades",
      localField: "actividadId",
      foreignField: "_id",
      as: "actividad"
    }
  },
  { $unwind: "$actividad" },
  {
    $project: {
      _id: 0,
      jugador: "$jugador.nombre",
      actividad: "$actividad.nombre",
      fichasGanadas: 1,
      fecha: 1
    }
  }
]).forEach(printjson);


// --------------------------------------------------------------------
// CONSULTA 2
// Objetivo: calcular cuántas fichas ha gastado cada jugador en canjes
// de premios en total, para saber quién es más "activo" canjeando.
// Relación explotada: canjes -> jugadores, canjes -> premios
// --------------------------------------------------------------------
print("=== Consulta 2: total de fichas gastadas en canjes, por jugador ===");
db.canjes.aggregate([
  {
    $lookup: {
      from: "premios",
      localField: "premioId",
      foreignField: "_id",
      as: "premio"
    }
  },
  { $unwind: "$premio" },
  {
    $lookup: {
      from: "jugadores",
      localField: "jugadorId",
      foreignField: "_id",
      as: "jugador"
    }
  },
  { $unwind: "$jugador" },
  {
    $group: {
      _id: "$jugador.nombre",
      totalFichasGastadas: { $sum: "$premio.costoFichas" },
      premiosCanjeados: { $push: "$premio.nombre" }
    }
  },
  { $sort: { totalFichasGastadas: -1 } }
]).forEach(printjson);
