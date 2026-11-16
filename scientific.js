// Scientific Calculator Module
const ScientificCalc = (() => {
  let expression = '';
  let memory = 0;
  let history = [];
  let isDegree = true;
  let justEvaluated = false;

  const display = () => document.getElementById('sci-display');
  const preview = () => document.getElementById('sci-preview');
  const historyEl = () => document.getElementById('sci-history');

  function toRad(val) { return isDegree ? val * Math.PI / 180 : val; }

  function updateDisplay() {
    const d = display();
    if (d) d.textContent = expression || '0';
  }

  function updatePreview() {
    const p = preview();
    if (!p) return;
    if (expression === '') { p.textContent = ''; return; }
    try {
      const result = safeEval(expression);
      p.textContent = isFinite(result) ? '= ' + formatNum(result) : '';
    } catch { p.textContent = ''; }
  }

  function formatNum(n) {
    if (Math.abs(n) >= 1e15 || (Math.abs(n) < 1e-10 && n !== 0)) return n.toExponential(6);
    return parseFloat(n.toPrecision(12)).toString();
  }

  function safeEval(expr) {
    // Replace math symbols
    let e = expr
      .replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-')
      .replace(/π/g, `(${Math.PI})`).replace(/e(?![+\-\d])/g, `(${Math.E})`)
      .replace(/√\(/g, 'Math.sqrt(')
      .replace(/sin\(/g, `Math.sin(toRad(`)
      .replace(/cos\(/g, `Math.cos(toRad(`)
      .replace(/tan\(/g, `Math.tan(toRad(`)
      .replace(/asin\(/g, `(isDegree?180/Math.PI:1)*Math.asin(`)
      .replace(/acos\(/g, `(isDegree?180/Math.PI:1)*Math.acos(`)
      .replace(/atan\(/g, `(isDegree?180/Math.PI:1)*Math.atan(`)
      .replace(/log\(/g, 'Math.log10(')
      .replace(/ln\(/g, 'Math.log(')
      .replace(/\^/g, '**')
      .replace(/(\d+)!/g, (_, n) => factorial(parseInt(n)));

    // Close any opened trig parens (double-paren pattern)
    const needsExtraClose = (e.match(/toRad\(/g) || []).length;
    for (let i = 0; i < needsExtraClose; i++) e += ')';

    return Function(`"use strict"; const toRad = ${toRad.toString()}; const isDegree = ${isDegree}; return (${e})`)();
  }

  function factorial(n) {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let r = 1; for (let i = 2; i <= n; i++) r *= i; return r;
  }

  function appendToExpr(val) {
    if (justEvaluated && /[\d(π]/.test(val)) { expression = ''; }
    justEvaluated = false;

    const lastChar = expression.slice(-1);
    // Auto-multiply before π, e, (
    if (/[πe(]/.test(val) && /[\d)]/.test(lastChar)) expression += '×';
    // Auto-multiply after )
    if (/[\d(]/.test(val) && lastChar === ')') expression += '×';

    expression += val;
    updateDisplay();
    updatePreview();
    addRipple(event?.target);
  }

  function calculate() {
    if (!expression) return;
    try {
      const result = safeEval(expression);
      if (typeof result !== 'number' || isNaN(result) || !isFinite(result)) {
        throw new Error('Invalid result');
      }
      const formatted = formatNum(result);
      addHistory(expression, formatted);
      expression = formatted;
      justEvaluated = true;
      updateDisplay();
      const p = preview();
      if (p) p.textContent = '';
      displayPulse();
    } catch (err) {
      console.error('Calculation error:', err);
      const d = display();
      if (d) d.textContent = 'Error';
      displayShake();
      expression = '';
    }
  }

  function getHistory() {
    try { return JSON.parse(localStorage.getItem('calcpro-calc-history')) || []; }
    catch { return []; }
  }

  function addHistory(expr, result) {
    history = getHistory();
    history.unshift({ expr, result });
    if (history.length > 25) history.pop();
    try { localStorage.setItem('calcpro-calc-history', JSON.stringify(history)); } catch {}
    renderHistory();
  }

  function clearHistory() {
    history = [];
    try { localStorage.removeItem('calcpro-calc-history'); } catch {}
    renderHistory();
    showToast('Calculation history cleared', 'info');
  }

  function renderHistory() {
    history = getHistory();
    const el = historyEl();
    if (!el) return;
    if (history.length === 0) {
      el.innerHTML = '<div class="history-empty">No calculations yet.<br>Start computing! 🚀</div>';
      return;
    }
    el.innerHTML = history.map(h => {
      const cleanVal = String(h.result || '').replace(/ \[.*\]/, '').replace(/'/g, "\\'");
      return `
        <div class="history-item" onclick="ScientificCalc.loadHistory('${cleanVal}')">
          <span class="hist-expr">${h.expr}</span>
          <span class="hist-result">= ${h.result}</span>
        </div>`;
    }).join('');
  }

  function loadHistory(val) {
    expression = val;
    justEvaluated = true;
    updateDisplay();
    updatePreview();
  }

  function clear() { expression = ''; justEvaluated = false; updateDisplay(); const p = preview(); if (p) p.textContent = ''; }
  function del() {
    if (justEvaluated) { expression = ''; justEvaluated = false; }
    else expression = expression.slice(0, -1);
    updateDisplay(); updatePreview();
  }
  function toggleSign() {
    if (!expression) return;
    if (expression.startsWith('-')) expression = expression.slice(1);
    else expression = '-' + expression;
    updateDisplay(); updatePreview();
  }
  function percent() {
    try { expression = formatNum(safeEval(expression) / 100); updateDisplay(); updatePreview(); } catch {}
  }
  function square() { expression += '^2'; updateDisplay(); updatePreview(); }
  function cube() { expression += '^3'; updateDisplay(); updatePreview(); }
  function reciprocal() { expression = `1÷(${expression})`; updateDisplay(); updatePreview(); }
  function memStore() { try { memory = safeEval(expression); showToast(`Stored: ${formatNum(memory)}`); } catch {} }
  function memAdd() { try { memory += safeEval(expression); showToast(`Memory: ${formatNum(memory)}`); } catch {} }
  function memSub() { try { memory -= safeEval(expression); showToast(`Memory: ${formatNum(memory)}`); } catch {} }
  function memRecall() { expression += formatNum(memory); justEvaluated = false; updateDisplay(); updatePreview(); }
  function memClear() { memory = 0; showToast('Memory cleared'); }
  function toggleAngle() {
    isDegree = !isDegree;
    const btn = document.getElementById('angle-toggle');
    if (btn) btn.textContent = isDegree ? 'DEG' : 'RAD';
  }

  function displayShake() {
    const d = display();
    if (!d) return;
    d.classList.add('shake');
    setTimeout(() => d.classList.remove('shake'), 500);
  }

  function displayPulse() {
    const d = display();
    if (!d) return;
    d.classList.remove('shake');
  }

  function addRipple(btn) {
    if (!btn) return;
    const r = document.createElement('span');
    r.className = 'ripple';
    btn.appendChild(r);
    setTimeout(() => r.remove(), 600);
  }

  function handleKeyboard(e) {
    const tab = document.querySelector('.tab-content.active');
    if (!tab || tab.id !== 'tab-scientific') return;
    const k = e.key;
    if (/[\d\+\-\*\/\.\(\)]/.test(k)) appendToExpr(k.replace('*', '×').replace('/', '÷'));
    else if (k === 'Enter' || k === '=') calculate();
    else if (k === 'Backspace') del();
    else if (k === 'Escape') clear();
    else if (k === '%') percent();
  }

  function init() {
    document.addEventListener('keydown', handleKeyboard);
    renderHistory();
  }

  return { init, appendToExpr, calculate, clear, del, toggleSign, percent, square, cube,
           reciprocal, memStore, memAdd, memSub, memRecall, memClear, toggleAngle, loadHistory, addHistory, clearHistory };
})();
