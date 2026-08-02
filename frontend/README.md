# Frontend — Luckyland Casino & Arcade

## Stack
- HTML, CSS y JavaScript puro (sin frameworks ni build tool — no necesita `npm install`)

## Instalación
No requiere instalación. Solo asegúrate de que el **backend** esté corriendo
en `http://localhost:3000` (ver `backend/README.md`).

## Ejecución
Abre `index.html` directamente en el navegador (doble clic, o arrástralo a
Chrome/Safari).

Si tu navegador bloquea las peticiones `fetch` al abrir el archivo así
(poco común, pero puede pasar), sirve la carpeta con:
```bash
npx serve .
```
y abre la URL que te indique en terminal (normalmente `http://localhost:3000`
o `:5000` — si choca con el puerto del backend, usa `npx serve . -l 5500`).

## Librerías empleadas
- Ninguna — JavaScript nativo (`fetch` para consumir la API) y Google Fonts
  (Bebas Neue, Work Sans, Space Mono) vía CDN.

## Qué muestra la interfaz
- **Registro de jugadores**: formulario que hace `POST /jugadores`.
- **Jugadores**: cada uno se muestra como una ficha de casino con su saldo.
- **Actividades**: mesas y máquinas disponibles (`GET /actividades`).
- **Historial de partidas**: consume `GET /reportes/historial-partidas`
  (la consulta con relación jugador↔actividad), en verde/rojo según
  ganancia o pérdida.
- **Leaderboard**: consume `GET /reportes/leaderboard`.

## Capturas
Ver `frontend/capturas/` para evidencia de la interfaz en ejecución.