// Graphing Calculator Module
const GraphingCalc = (() => {
  let canvas, ctx;
  let functions = [];
  const colors = ['#00f5d4', '#9b5de5', '#f72585', '#fee440'];
  let offsetX = 0, offsetY = 0, scale = 60;
  let isDragging = false, lastX, lastY;

  function toRad(v) { return v * Math.PI / 180; }

  function safeEval(expr, x) {
    let e = expr
      .replace(/\^/g, '**')
      .replace(/sin\(/g, 'Math.sin(')
      .replace(/cos\(/g, 'Math.cos(')
      .replace(/tan\(/g, 'Math.tan(')
      .replace(/asin\(/g, 'Math.asin(')
      .replace(/acos\(/g, 'Math.acos(')
      .replace(/atan\(/g, 'Math.atan(')
      .replace(/log\(/g, 'Math.log10(')
      .replace(/ln\(/g, 'Math.log(')
      .replace(/sqrt\(/g, 'Math.sqrt(')
      .replace(/abs\(/g, 'Math.abs(')
      .replace(/π/g, `${Math.PI}`)
      .replace(/e(?![+\-\d])/g, `${Math.E}`);
    return Function(`"use strict"; const x = ${x}; return (${e})`)();
  }

  function init() {
    canvas = document.getElementById('graph-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', () => { resizeCanvas(); draw(); });

    canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      scale *= e.deltaY > 0 ? 0.9 : 1.1;
      scale = Math.max(10, Math.min(500, scale));
      draw();
    });
    canvas.addEventListener('mousedown', (e) => { isDragging = true; lastX = e.clientX; lastY = e.clientY; });
    canvas.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      offsetX += e.clientX - lastX; offsetY += e.clientY - lastY;
      lastX = e.clientX; lastY = e.clientY; draw();
    });
    canvas.addEventListener('mouseup', () => isDragging = false);
    canvas.addEventListener('touchstart', (e) => { isDragging = true; lastX = e.touches[0].clientX; lastY = e.touches[0].clientY; });
    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (!isDragging) return;
      offsetX += e.touches[0].clientX - lastX; offsetY += e.touches[0].clientY - lastY;
      lastX = e.touches[0].clientX; lastY = e.touches[0].clientY; draw();
    });
    canvas.addEventListener('touchend', () => isDragging = false);
    draw();
  }

  function resizeCanvas() {
    const container = canvas.parentElement;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight || 400;
    offsetX = canvas.width / 2;
    offsetY = canvas.height / 2;
  }

  function addFunction() {
    if (functions.length >= 4) { showToast('Max 4 functions'); return; }
    const inp = document.getElementById('graph-input');
    const expr = inp?.value?.trim();
    if (!expr) return;
    functions.push({ expr, color: colors[functions.length] });
    inp.value = '';
    renderFunctionList();
    draw();
  }

  function removeFunction(idx) {
    functions.splice(idx, 1);
    // Reassign colors
    functions.forEach((f, i) => f.color = colors[i]);
    renderFunctionList();
    draw();
  }

  function renderFunctionList() {
    const el = document.getElementById('graph-fn-list');
    if (!el) return;
    el.innerHTML = functions.map((f, i) => `
      <div class="fn-tag" style="border-color:${f.color}">
        <span style="color:${f.color}">f${i+1}(x) =</span> ${f.expr}
        <button onclick="GraphingCalc.removeFunction(${i})" class="fn-remove">×</button>
      </div>`).join('');
  }

  function draw() {
    if (!ctx) return;
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // Background
    ctx.fillStyle = isLight ? '#f1f5f9' : '#0d1117';
    ctx.fillRect(0, 0, W, H);

    drawGrid(W, H, isLight);
    drawAxes(W, H, isLight);

    functions.forEach(f => plotFunction(f.expr, f.color, W, H));
  }

  function drawGrid(W, H, isLight) {
    ctx.strokeStyle = isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;

    const step = scale;
    // Vertical lines
    for (let x = offsetX % step; x < W; x += step) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    // Horizontal lines
    for (let y = offsetY % step; y < H; y += step) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
  }

  function drawAxes(W, H, isLight) {
    ctx.strokeStyle = isLight ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 1.5;

    // X axis
    ctx.beginPath(); ctx.moveTo(0, offsetY); ctx.lineTo(W, offsetY); ctx.stroke();
    // Y axis
    ctx.beginPath(); ctx.moveTo(offsetX, 0); ctx.lineTo(offsetX, H); ctx.stroke();

    // Labels
    ctx.fillStyle = isLight ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)';
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.textAlign = 'center';

    for (let i = -20; i <= 20; i++) {
      if (i === 0) continue;
      const px = offsetX + i * scale;
      const py = offsetY + i * scale;
      if (px > 0 && px < W) {
        ctx.fillText(i, px, offsetY + 14);
        ctx.beginPath(); ctx.moveTo(px, offsetY - 3); ctx.lineTo(px, offsetY + 3); ctx.stroke();
      }
      if (py > 0 && py < H) {
        ctx.fillText(-i, offsetX - 18, py + 3);
        ctx.beginPath(); ctx.moveTo(offsetX - 3, py); ctx.lineTo(offsetX + 3, py); ctx.stroke();
      }
    }
  }

  function plotFunction(expr, color, W, H) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = color;
    ctx.shadowBlur = 8;
    ctx.beginPath();
    let started = false, prevY;

    for (let px = 0; px < W; px += 1) {
      const x = (px - offsetX) / scale;
      let y;
      try {
        y = safeEval(expr, x);
        if (!isFinite(y) || isNaN(y)) { started = false; continue; }
        const py = offsetY - y * scale;
        if (Math.abs(py - (prevY || py)) > H * 2) { started = false; }
        if (!started) { ctx.moveTo(px, py); started = true; }
        else ctx.lineTo(px, py);
        prevY = py;
      } catch { started = false; }
    }
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  function reset() {
    scale = 60; offsetX = canvas.width / 2; offsetY = canvas.height / 2; draw();
  }
  function clearAll() { functions = []; renderFunctionList(); draw(); }
  function zoomIn() { scale = Math.min(500, scale * 1.3); draw(); }
  function zoomOut() { scale = Math.max(10, scale / 1.3); draw(); }

  return { init, addFunction, removeFunction, reset, clearAll, zoomIn, zoomOut, draw };
})();
