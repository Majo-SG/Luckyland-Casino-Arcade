// app.js — consume la API del backend NestJS (http://localhost:3000)

const API_URL = 'http://localhost:3000';

const connDot = document.getElementById('connDot');
const connText = document.getElementById('connText');

function marcarConexion(ok) {
  connDot.classList.toggle('ok', ok);
  connDot.classList.toggle('err', !ok);
  connText.textContent = ok
    ? 'conectado al backend'
    : 'no se pudo conectar al backend (¿está corriendo en :3000?)';
}

async function apiGet(path) {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) throw new Error(`Error ${res.status} en ${path}`);
  return res.json();
}

async function apiPost(path, body) {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Error ${res.status} en ${path}`);
  return res.json();
}

// ---------- JUGADORES ----------
async function cargarJugadores() {
  const grid = document.getElementById('jugadoresGrid');
  try {
    const jugadores = await apiGet('/jugadores');
    marcarConexion(true);

    if (jugadores.length === 0) {
      grid.innerHTML = '<p class="empty-state">Aún no hay jugadores registrados.</p>';
      return;
    }

    grid.innerHTML = jugadores.map(j => `
      <div class="chip-card">
        <div class="chip">
          <span class="chip-value">${j.fichas}</span>
        </div>
        <div class="chip-name">${escapeHtml(j.nombre)}</div>
      </div>
    `).join('');
  } catch (err) {
    marcarConexion(false);
    grid.innerHTML = '<p class="empty-state">No se pudieron cargar los jugadores.</p>';
  }
}

document.getElementById('formJugador').addEventListener('submit', async (e) => {
  e.preventDefault();
  const nombre = document.getElementById('inputNombre').value.trim();
  const fichas = Number(document.getElementById('inputFichas').value || 0);
  if (!nombre) return;

  try {
    await apiPost('/jugadores', { nombre, fichas });
    document.getElementById('inputNombre').value = '';
    document.getElementById('inputFichas').value = 100;
    await cargarJugadores();
    await cargarLeaderboard();
  } catch (err) {
    alert('No se pudo registrar al jugador. Revisa que el backend esté corriendo.');
  }
});

// ---------- ACTIVIDADES ----------
async function cargarActividades() {
  const row = document.getElementById('actividadesRow');
  try {
    const actividades = await apiGet('/actividades');
    if (actividades.length === 0) {
      row.innerHTML = '<p class="empty-state">Aún no hay actividades registradas.</p>';
      return;
    }
    row.innerHTML = actividades.map(a => `
      <div class="activity-tag">
        <span class="tipo">${a.tipo}</span>
        <strong>${escapeHtml(a.nombre)}</strong>
        <span class="costo">entrada: ${a.costoEntrada} fichas</span>
      </div>
    `).join('');
  } catch (err) {
    row.innerHTML = '<p class="empty-state">No se pudieron cargar las actividades.</p>';
  }
}

// ---------- HISTORIAL (consulta con relaciones) ----------
async function cargarHistorial() {
  const tbody = document.querySelector('#tablaHistorial tbody');
  try {
    const historial = await apiGet('/reportes/historial-partidas');
    if (historial.length === 0) {
      tbody.innerHTML = '<tr><td colspan="4" class="empty-state">Sin partidas registradas.</td></tr>';
      return;
    }
    tbody.innerHTML = historial.map(h => {
      const gana = h.fichasGanadas >= 0;
      const fecha = new Date(h.fecha).toLocaleDateString('es-MX');
      return `
        <tr>
          <td>${escapeHtml(h.jugador)}</td>
          <td>${escapeHtml(h.actividad)}</td>
          <td class="resultado ${gana ? 'gana' : 'pierde'}">${gana ? '+' : ''}${h.fichasGanadas}</td>
          <td>${fecha}</td>
        </tr>
      `;
    }).join('');
  } catch (err) {
    tbody.innerHTML = '<tr><td colspan="4" class="empty-state">No se pudo cargar el historial.</td></tr>';
  }
}

// ---------- LEADERBOARD ----------
async function cargarLeaderboard() {
  const list = document.getElementById('leaderboardList');
  try {
    const leaderboard = await apiGet('/reportes/leaderboard');
    if (leaderboard.length === 0) {
      list.innerHTML = '<li class="empty-state">Aún no hay datos suficientes.</li>';
      return;
    }
    list.innerHTML = leaderboard.map((l, i) => `
      <li>
        <span class="rank">${i + 1}</span>
        <span class="lb-name">${escapeHtml(l.jugador)}</span>
        <span class="lb-total">${l.totalGanado >= 0 ? '+' : ''}${l.totalGanado} fichas</span>
      </li>
    `).join('');
  } catch (err) {
    list.innerHTML = '<li class="empty-state">No se pudo cargar el leaderboard.</li>';
  }
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ---------- INIT ----------
cargarJugadores();
cargarActividades();
cargarHistorial();
cargarLeaderboard();
