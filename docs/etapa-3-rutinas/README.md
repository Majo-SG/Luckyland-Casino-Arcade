---

### 4. `docs/etapa-3-rutinas/README.md`

```markdown
# ⚙️ Etapa 3: Rutinas Almacenadas, Triggers y Vistas

## 🧩 Lógica de Negocio en Base de Datos

En esta fase se encapsula la lógica operativa del casino directamente en el motor MySQL.

### 1. Procedimientos Almacenados (`Stored Procedures`)
- `sp_realizar_recarga()`: Procesa la recarga de fichas de un jugador actualizando su saldo mediante transacciones de forma segura (`START TRANSACTION`, `COMMIT`, `ROLLBACK`).
- `sp_registrar_apuesta()`: Valida si el jugador tiene saldo suficiente antes de descontar las fichas y registrar la partida.

### 2. Disparadores (`Triggers`)
- `trg_actualizar_saldo_premio`: Descuenta automáticamente los puntos o fichas cuando un usuario canjea un premio.
- `trg_log_auditoria_jugadores`: Guarda un registro histórico ante cualquier modificación en el saldo o datos del usuario.

### 3. Vistas (`Views`)
- `vw_top_jugadores`: Muestra los jugadores con mayor volumen de apuestas.
- `vw_reporte_maquinas_populares`: Resumen de ganancias y uso por cada máquina arcade.