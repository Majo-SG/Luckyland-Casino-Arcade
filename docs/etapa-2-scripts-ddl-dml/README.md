 # 💾 Etapa 2: Scripts DDL (Estructura) y DML (Poblado de Datos)

## 📋 Descripción
Esta etapa contiene el código SQL para instanciar el esquema de la base de datos `luckyland_db` e insertar datos iniciales para pruebas.

## 🚀 Orden de Ejecución

1. **`01_schema_luckyland.sql` (DDL):** Crea las tablas, define tipos de datos y asigna restricciones (`PRIMARY KEY`, `FOREIGN KEY`, `CHECK`, `UNIQUE`).
2. **`02_inserts_luckyland.sql` (DML):** Carga los datos base para pruebas de funcionamiento.

## ⚙️ Instrucciones de Ejecución en DBeaver / MySQL CLI

```sql
-- 1. Crear e indicar el uso de la base de datos
CREATE DATABASE IF NOT EXISTS luckyland_db;
USE luckyland_db;

-- 2. Ejecutar los scripts en orden
SOURCE sql/01_schema_luckyland.sql;
SOURCE sql/02_inserts_luckyland.sql;