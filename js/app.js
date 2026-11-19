/**
 * Aplicacion Principal - Integracion de Modulos y UI
 */

// NOTA: Si tus archivos estan directo en js/ (sin subcarpeta modules),
// cambia "./modules/..." por "./bairesdev.js", "./cuadratica.js", etc.
import {
  calcularProbabilidadDados,
  calcularPartidosTorneo,
  contarMultiplosMenores,
  calcularViajesMinimos,
  contarDigito,
  calcularEdadFutura,
  calcularPesoRecipiente,
  calcularDiferenciaIngreso,
  calcularAhorroContado,
  calcularAlquiler
} from "./modules/bairesdev.js";

import { resolverCuadratica, evaluarPolinomio } from "./modules/cuadratica.js";
import { analizarSecuencia } from "./modules/secuencias.js";
import { ejecutarSuiteCompleta } from "./modules/test-suite.js";

document.addEventListener("DOMContentLoaded", () => {
  initTabs();
  initModuloA();
  initModuloB();
  initModuloC();
  initModuloD();
});

/* -------------------------------------------------------------
   NAVEGACION POR PESTAÑAS
------------------------------------------------------------- */
function initTabs() {
  const tabs = document.querySelectorAll(".nav-tab");
  const panes = document.querySelectorAll(".tab-pane");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      panes.forEach(p => p.classList.remove("active"));

      tab.classList.add("active");
      const targetId = tab.getAttribute("data-tab");
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add("active");
      }
    });
  });
}

/* -------------------------------------------------------------
   MODULO A: SIMULADOR BAIRESDEV (10 RETOS)
------------------------------------------------------------- */
function initModuloA() {
  // Reto 1: Dados
  document.getElementById("btn-calc-dados")?.addEventListener("click", () => {
    const resDados = document.getElementById("res-dados");
    try {
      const suma = parseInt(document.getElementById("input-dados-suma").value, 10);
      const res = calcularProbabilidadDados(suma);
      resDados.innerHTML = `Suma Objetivo: <strong>${suma}</strong><br>` +
                           `Casos Favorables: <strong>${res.casosFavorables} / ${res.casosTotales}</strong><br>` +
                           `Probabilidad Decimal: <strong>${res.probabilidad.toFixed(4)}</strong><br>` +
                           `Porcentaje: <strong>${res.porcentaje}</strong>`;
    } catch (e) {
      resDados.innerHTML = `<span style="color: var(--accent-red);">${e.message}</span>`;
    }
  });

  // Reto 2: Torneo
  document.getElementById("btn-calc-torneo")?.addEventListener("click", () => {
    const resTorneo = document.getElementById("res-torneo");
    try {
      const n = parseInt(document.getElementById("input-torneo-equipos").value, 10);
      const partidos = calcularPartidosTorneo(n);
      resTorneo.innerHTML = `Equipos participantes: <strong>${n}</strong><br>` +
                            `Partidos Totales C(${n}, 2): <strong>${partidos} partidos</strong>`;
    } catch (e) {
      resTorneo.innerHTML = `<span style="color: var(--accent-red);">${e.message}</span>`;
    }
  });

  // Reto 3: Divisores
  document.getElementById("btn-calc-div")?.addEventListener("click", () => {
    const resDiv = document.getElementById("res-div");
    try {
      const lim = parseInt(document.getElementById("input-div-limite").value, 10);
      const div = parseInt(document.getElementById("input-div-divisor").value, 10);
      const cant = contarMultiplosMenores(lim, div);
      resDiv.innerHTML = `Enteros en el rango [1, ${lim - 1}] divisibles por ${div}:<br>` +
                         `Total: <strong>${cant} números</strong> (Tiempo O(1))`;
    } catch (e) {
      resDiv.innerHTML = `<span style="color: var(--accent-red);">${e.message}</span>`;
    }
  });

  // Reto 4: Botellas / Logistica
  document.getElementById("btn-calc-botellas")?.addEventListener("click", () => {
    const resBotellas = document.getElementById("res-botellas");
    try {
      const tot = parseInt(document.getElementById("input-botellas-total").value, 10);
      const cap = parseInt(document.getElementById("input-botellas-cap").value, 10);
      const viajes = calcularViajesMinimos(tot, cap);
      resBotellas.innerHTML = `Botellas totales: <strong>${tot}</strong> (Capacidad: ${cap})<br>` +
                              `Viajes requeridos: <strong>${viajes} viajes</strong>`;
    } catch (e) {
      resBotellas.innerHTML = `<span style="color: var(--accent-red);">${e.message}</span>`;
    }
  });

  // Reto 5: Conteo de digito
  document.getElementById("btn-calc-digito")?.addEventListener("click", () => {
    const resDigito = document.getElementById("res-digito");
    try {
      const n = parseInt(document.getElementById("input-digito-n").value, 10);
      const d = parseInt(document.getElementById("input-digito-d").value, 10);
      const total = contarDigito(n, d);
      resDigito.innerHTML = `Del 1 al <strong>${n}</strong>, el dígito <strong>${d}</strong> aparece <strong>${total} veces</strong>.`;
    } catch (e) {
      resDigito.innerHTML = `<span style="color: var(--accent-red);">${e.message}</span>`;
    }
  });

  // Reto 6: Edades relativas
  document.getElementById("btn-calc-edades")?.addEventListener("click", () => {
    const resEdades = document.getElementById("res-edades");
    try {
      const pablo = parseInt(document.getElementById("input-edades-pablo").value, 10);
      const k = parseFloat(document.getElementById("input-edades-k").value);
      const res = calcularEdadFutura(pablo, k);
      resEdades.innerHTML = `Edad hermana hoy: <strong>${res.edadHermana} años</strong><br>` +
                            `En <strong>${res.anios} años</strong> Pablo tendrá <strong>${res.edadPabloFutura}</strong> y su hermana <strong>${res.edadHermanaFutura}</strong>.`;
    } catch (e) {
      resEdades.innerHTML = `<span style="color: var(--accent-red);">${e.message}</span>`;
    }
  });

  // Reto 7: Peso recipiente vacio
  document.getElementById("btn-calc-recipiente")?.addEventListener("click", () => {
    const resRec = document.getElementById("res-recipiente");
    try {
      const lleno = parseFloat(document.getElementById("input-rec-lleno").value);
      const parcial = parseFloat(document.getElementById("input-rec-parcial").value);
      const frac = parseFloat(document.getElementById("input-rec-fraccion").value);
      const res = calcularPesoRecipiente(lleno, parcial, frac);
      resRec.innerHTML = `Recipiente vacío: <strong>${res.vacio} g</strong> | Contenido total: <strong>${res.contenido} g</strong>`;
    } catch (e) {
      resRec.innerHTML = `<span style="color: var(--accent-red);">${e.message}</span>`;
    }
  });

  // Reto 8: Diferencia de ingresos
  document.getElementById("btn-calc-ingresos")?.addEventListener("click", () => {
    const resIng = document.getElementById("res-ingresos");
    try {
      const q1 = parseInt(document.getElementById("input-ing-q1").value, 10);
      const p1 = parseInt(document.getElementById("input-ing-p1").value, 10);
      const q2 = parseInt(document.getElementById("input-ing-q2").value, 10);
      const p2 = parseInt(document.getElementById("input-ing-p2").value, 10);
      const res = calcularDiferenciaIngreso(q1, p1, q2, p2);
      resIng.innerHTML = `Antes: <strong>$${res.ingreso1.toFixed(2)}</strong> | Después: <strong>$${res.ingreso2.toFixed(2)}</strong><br>` +
                         `Diferencia neta: <strong>$${res.diferencia.toFixed(2)}</strong>`;
    } catch (e) {
      resIng.innerHTML = `<span style="color: var(--accent-red);">${e.message}</span>`;
    }
  });

  // Reto 9: Ahorro al contado
  document.getElementById("btn-calc-ahorro")?.addEventListener("click", () => {
    const resAhorro = document.getElementById("res-ahorro");
    try {
      const cuotas = parseInt(document.getElementById("input-aho-cuotas").value, 10);
      const valor = parseFloat(document.getElementById("input-aho-valor").value);
      const contado = parseFloat(document.getElementById("input-aho-contado").value);
      const res = calcularAhorroContado(cuotas, valor, contado);
      resAhorro.innerHTML = `Total en cuotas: <strong>$${res.totalCuotas.toFixed(2)}</strong><br>` +
                            `Ahorro pagando de contado: <strong>$${res.ahorro.toFixed(2)}</strong>`;
    } catch (e) {
      resAhorro.innerHTML = `<span style="color: var(--accent-red);">${e.message}</span>`;
    }
  });

  // Reto 10: Presupuesto y porcentaje inverso (Cascarita 3)
  document.getElementById("btn-calc-alquiler")?.addEventListener("click", () => {
    const resAlq = document.getElementById("res-alquiler");
    try {
      const comida = parseFloat(document.getElementById("input-alq-comida").value);
      const pct = parseFloat(document.getElementById("input-alq-porcentaje").value);
      const res = calcularAlquiler(comida, pct);
      resAlq.innerHTML = `Alquiler total: <strong>$${res.alquiler.toFixed(2)}</strong><br>` +
                         `Verificación IEEE-754: <code>===</code> da <strong>${res.comparacionEstricta}</strong> | ` +
                         `<code>Epsilon</code> da <strong>${res.comparacionSegura}</strong>`;
    } catch (e) {
      resAlq.innerHTML = `<span style="color: var(--accent-red);">${e.message}</span>`;
    }
  });
}

/* -------------------------------------------------------------
   MODULO B: MOTOR CUADRATICO & CANVAS
------------------------------------------------------------- */
function initModuloB() {
  const btnResolver = document.getElementById("btn-resolver-cuadratica");
  const inputA = document.getElementById("coef-a");
  const inputB = document.getElementById("coef-b");
  const inputC = document.getElementById("coef-c");

  const outEq = document.getElementById("out-eq");
  const outDelta = document.getElementById("out-delta");
  const outTipo = document.getElementById("out-tipo");
  const outVertice = document.getElementById("out-vertice");
  const outRaices = document.getElementById("out-raices");
  const canvas = document.getElementById("parabola-canvas");

  if (!btnResolver) return;

  function resolverYDibujar() {
    const a = parseFloat(inputA.value);
    const b = parseFloat(inputB.value);
    const c = parseFloat(inputC.value);

    const signoB = b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`;
    const signoC = c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`;
    outEq.textContent = `${a}x² ${signoB}x ${signoC} = 0`;

    const res = resolverCuadratica(a, b, c);

    outDelta.textContent = res.discriminante !== null && res.discriminante !== undefined
      ? res.discriminante.toExponential(4)
      : "N/A";
    outTipo.textContent = res.descripcion;
    outVertice.textContent = res.vertice
      ? `(${res.vertice.h.toFixed(2)}, ${res.vertice.k.toFixed(2)})`
      : "N/A (Línea o degenerada)";

    if (res.tipo === "REALES_DISTINTAS") {
      outRaices.textContent = `x₁ = ${res.raices[0].toExponential(4)}, x₂ = ${res.raices[1].toExponential(4)}`;
    } else if (res.tipo === "RAIZ_DOBLE") {
      outRaices.textContent = `x = ${res.raices[0].toFixed(4)} (Doble)`;
    } else if (res.tipo === "COMPLEJAS_CONJUGADAS") {
      outRaices.textContent = `${res.raices[0].texto}, ${res.raices[1].texto}`;
    } else if (res.tipo === "LINEAL_DEGENERADA") {
      outRaices.textContent = `x = ${res.raices[0].toFixed(4)} (Solución única lineal)`;
    } else {
      outRaices.textContent = res.descripcion;
    }

    dibujarParabola(canvas, a, b, c, res);
  }

  btnResolver.addEventListener("click", resolverYDibujar);

  document.querySelectorAll(".presets-row .btn-chip[data-a]").forEach(chip => {
    chip.addEventListener("click", () => {
      inputA.value = chip.getAttribute("data-a");
      inputB.value = chip.getAttribute("data-b");
      inputC.value = chip.getAttribute("data-c");
      resolverYDibujar();
    });
  });

  resolverYDibujar();
}

function dibujarParabola(canvas, a, b, c, res) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;

  ctx.fillStyle = "#020617";
  ctx.fillRect(0, 0, W, H);

  const centroX = res.vertice && Math.abs(res.vertice.h) < 1e4 ? res.vertice.h : 0;
  const centroY = res.vertice && Math.abs(res.vertice.k) < 1e4 ? res.vertice.k : 0;
  const spanX = Math.max(Math.abs(centroX) * 2, 8);
  const minX = centroX - spanX;
  const maxX = centroX + spanX;

  const scaleX = W / (maxX - minX);
  const originCanvasX = (0 - minX) * scaleX;
  const originCanvasY = H / 2;
  const scaleY = H / 20;

  const toScreen = (x, y) => ({
    sx: (x - minX) * scaleX,
    sy: originCanvasY - (y - centroY) * (scaleY * 0.4)
  });

  ctx.strokeStyle = "#1e293b";
  ctx.lineWidth = 1;
  for (let i = 0; i <= W; i += 40) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, H); ctx.stroke();
  }
  for (let j = 0; j <= H; j += 40) {
    ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(W, j); ctx.stroke();
  }

  ctx.strokeStyle = "#475569";
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(0, originCanvasY); ctx.lineTo(W, originCanvasY); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(originCanvasX, 0); ctx.lineTo(originCanvasX, H); ctx.stroke();

  ctx.strokeStyle = "#06b6d4";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  let first = true;
  const dx = (maxX - minX) / 120;
  for (let x = minX; x <= maxX; x += dx) {
    const y = evaluarPolinomio(a, b, c, x);
    const pt = toScreen(x, y);
    if (first) { ctx.moveTo(pt.sx, pt.sy); first = false; }
    else { ctx.lineTo(pt.sx, pt.sy); }
  }
  ctx.stroke();

  if (res.vertice) {
    const ptV = toScreen(res.vertice.h, res.vertice.k);
    ctx.fillStyle = "#10b981";
    ctx.beginPath(); ctx.arc(ptV.sx, ptV.sy, 5, 0, Math.PI * 2); ctx.fill();
  }

  if (res.tipo === "REALES_DISTINTAS" || res.tipo === "RAIZ_DOBLE") {
    ctx.fillStyle = "#ef4444";
    res.raices.forEach(r => {
      const ptR = toScreen(r, 0);
      ctx.beginPath(); ctx.arc(ptR.sx, ptR.sy, 5, 0, Math.PI * 2); ctx.fill();
    });
  }
}

/* -------------------------------------------------------------
   MODULO C: DETECTOR DE SECUENCIAS
------------------------------------------------------------- */
function initModuloC() {
  const btnSecuencia = document.getElementById("btn-analizar-secuencia");
  const inputSec = document.getElementById("input-secuencia");
  const resSec = document.getElementById("res-secuencia");

  if (!btnSecuencia) return;

  function analizar() {
    try {
      const raw = inputSec.value.split(",").map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
      if (raw.length < 3) {
        throw new Error("Por favor introduce al menos 3 números válidos separados por comas.");
      }
      const res = analizarSecuencia(raw);
      resSec.innerHTML = `Secuencia ingresada: <strong>[${raw.join(", ")}]</strong><br>` +
                         `Patrón detectado: <strong>${res.tipo}</strong><br>` +
                         `Descripción Matemática: <strong>${res.descripcion}</strong><br>` +
                         (res.siguienteTermino !== null
                           ? `Próximo Número Estimado: <strong style="color: var(--accent-green); font-size: 1.15rem;">${res.siguienteTermino}</strong>`
                           : `<span style="color: var(--accent-orange);">No fue posible predecir con reglas polinómicas simples.</span>`);
    } catch (e) {
      resSec.innerHTML = `<span style="color: var(--accent-red);">${e.message}</span>`;
    }
  }

  btnSecuencia.addEventListener("click", analizar);

  document.querySelectorAll(".presets-row .btn-chip[data-seq]").forEach(chip => {
    chip.addEventListener("click", () => {
      inputSec.value = chip.getAttribute("data-seq");
      analizar();
    });
  });
}

/* -------------------------------------------------------------
   MODULO D: SUITE DE PRUEBAS UNITARIAS
------------------------------------------------------------- */
function initModuloD() {
  const btnRun = document.getElementById("btn-run-all-tests");
  const tableBody = document.getElementById("test-results-body");
  const summaryBadges = document.getElementById("test-summary-badges");

  if (!btnRun) return;

  btnRun.addEventListener("click", () => {
    const suite = ejecutarSuiteCompleta();
    tableBody.innerHTML = "";

    suite.resultados.forEach(r => {
      const tr = document.createElement("tr");
      const catBadge = r.esCascarita
        ? `<span class="tag-cat trap">${r.categoria}</span>`
        : `<span class="tag-cat">${r.categoria}</span>`;
      const statusBadge = r.pass
        ? `<span class="badge-pass">✔ PASS</span>`
        : `<span class="badge-fail">✖ FAIL</span>`;

      tr.innerHTML = `
        <td style="font-family: var(--font-mono); font-weight: bold;">#${r.id}</td>
        <td><strong>${r.nombre}</strong></td>
        <td>${catBadge}</td>
        <td>${statusBadge}</td>
        <td style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--text-muted);">${r.detalle}</td>
      `;
      tableBody.appendChild(tr);
    });

    summaryBadges.innerHTML = suite.todosAprobados
      ? `<span class="badge-status pass">✔ 10/10 PRUEBAS SUPERADAS (${suite.pasados} PASS)</span>`
      : `<span class="badge-status fail">✖ ${suite.fallados} PRUEBA(S) FALLADA(S) • ${suite.pasados}/10 PASS</span>`;
  });
}
