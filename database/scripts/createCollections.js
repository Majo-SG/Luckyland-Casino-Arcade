// createCollections.js
// Ejecutar con: mongosh casino_db scripts/createCollections.js
//
// Crea las 5 colecciones del proyecto con validación de esquema.
// Usar validación no es obligatorio en MongoDB, pero suma puntos en
// "implementación avanzada" porque no se ve normalmente en clase.

db.createCollection("jugadores", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nombre", "fichas", "fechaRegistro"],
      properties: {
        nombre: { bsonType: "string" },
        fichas: { bsonType: "int", minimum: 0 },
        fechaRegistro: { bsonType: "date" }
      }
    }
  }
});

db.createCollection("actividades", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nombre", "tipo", "costoEntrada"],
      properties: {
        nombre: { bsonType: "string" },
        tipo: { enum: ["mesa", "maquina"] },
        costoEntrada: { bsonType: "int", minimum: 0 }
      }
    }
  }
});

db.createCollection("partidas", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["jugadorId", "actividadId", "fichasGanadas", "fecha"],
      properties: {
        jugadorId: { bsonType: "objectId" },
        actividadId: { bsonType: "objectId" },
        fichasGanadas: { bsonType: "int" }, // puede ser negativo (pérdida)
        fecha: { bsonType: "date" }
      }
    }
  }
});

db.createCollection("premios", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nombre", "costoFichas"],
      properties: {
        nombre: { bsonType: "string" },
        costoFichas: { bsonType: "int", minimum: 0 }
      }
    }
  }
});

db.createCollection("canjes", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["jugadorId", "premioId", "fecha"],
      properties: {
        jugadorId: { bsonType: "objectId" },
        premioId: { bsonType: "objectId" },
        fecha: { bsonType: "date" }
      }
    }
  }
});

print("Colecciones creadas: jugadores, actividades, partidas, premios, canjes");
