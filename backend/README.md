# Backend — Casino & Arcade Híbrido

## Stack
- **NestJS** (framework backend)
- **Mongoose** (ODM para MongoDB)
- **class-validator / class-transformer** (validación de DTOs)

## Instalación

```bash
cd backend
npm install
```

## Configuración

Copia `.env.example` a `.env` y ajusta si es necesario:

```bash
cp .env.example .env
```

Por defecto se conecta a `mongodb://127.0.0.1:27017/casino_db` — la misma
base de datos que ya creamos y sembramos con los scripts de `database/scripts/`.

## Ejecución

```bash
# modo desarrollo (con recarga automática)
npm run start:dev

# modo producción
npm run build
npm run start:prod
```

El servidor levanta en `http://localhost:3000` por defecto.

## Endpoints

### Jugadores
| Método | Ruta               | Descripción           |
|--------|---------------------|------------------------|
| POST   | `/jugadores`         | Crear jugador          |
| GET    | `/jugadores`         | Listar jugadores       |
| GET    | `/jugadores/:id`     | Obtener un jugador     |
| PATCH  | `/jugadores/:id`     | Actualizar jugador     |
| DELETE | `/jugadores/:id`     | Eliminar jugador       |

### Actividades
Mismos 5 endpoints, bajo `/actividades`.

### Partidas
Mismos 5 endpoints, bajo `/partidas`. `GET` incluye el jugador y la
actividad completos (populate), no solo sus IDs.

### Premios
Mismos 5 endpoints, bajo `/premios`.

### Canjes
Mismos 5 endpoints, bajo `/canjes`. `GET` incluye jugador y premio completos.

### Reportes (consultas de relación + funciones avanzadas)
| Método | Ruta                                   | Objetivo                                                        |
|--------|------------------------------------------|-------------------------------------------------------------------|
| GET    | `/reportes/historial-partidas`           | Historial de partidas con nombre de jugador y actividad (no IDs) |
| GET    | `/reportes/total-canjes-por-jugador`     | Total de fichas gastadas en canjes, agrupado por jugador          |
| GET    | `/reportes/saldo/:jugadorId`             | **Implementación avanzada**: saldo de fichas calculado en tiempo real (ganado en partidas − gastado en canjes) |
| GET    | `/reportes/leaderboard`                  | **Innovación**: tabla de líderes de jugadores por fichas ganadas  |

## Librerías empleadas
- `@nestjs/mongoose`, `mongoose`
- `@nestjs/config`
- `class-validator`, `class-transformer`, `@nestjs/mapped-types`