 ---

### 2. `docs/etapa-1-diseno/README.md`

```markdown
# 📐 Etapa 1: Diseño y Modelado Relacional

## 🎯 Objetivo
Diseñar el modelo conceptual y lógico de la base de datos para el sistema **Luckyland Casino Arcade**, aplicando reglas de normalización (1FN, 2FN, 3FN).

## 🎰 Entidades Principales
1. **Jugadores / Usuarios (`jugadores`):** Información personal, saldo de fichas y nivel de membresía.
2. **Máquinas / Juegos (`maquinas`):** Catálogo de máquinas arcade y mesas de casino activas.
3. **Transacciones / Cargas (`transacciones`):** Historial de recargas monetarias y cambio de fichas.
4. **Historial de Apuestas (`partidas_apuestas`):** Registro de jugadas, apuestas realizadas y premios entregados.
5. **Premios / Recompensas (`premios`):** Catálogo de recompensas canjeables por fichas/puntos.

## 📊 Diagramas
*(Puedes adjuntar tus imágenes dentro de esta carpeta y enlazarlas)*
- **Diagrama Entidad-Relación (DER):** `![DER](./diagrama-er.png)`
- **Modelo Relacional:** Estrategia de claves primarias (`PK`) y claves foráneas (`FK`).