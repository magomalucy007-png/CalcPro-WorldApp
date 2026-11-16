// Matrix Calculator Module
const MatrixCalc = (() => {
  let matA = [], matB = [];
  let rowsA = 2, colsA = 2, rowsB = 2, colsB = 2;

  function init() {
    buildMatrix('A', rowsA, colsA);
    buildMatrix('B', rowsB, colsB);
  }

  function buildMatrix(id, rows, cols) {
    const el = document.getElementById(`matrix-${id}`);
    if (!el) return;
    el.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    el.innerHTML = '';
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const inp = document.createElement('input');
        inp.type = 'number';
        inp.className = 'matrix-cell';
        inp.placeholder = '0';
        inp.id = `m${id}-${r}-${c}`;
        inp.value = '';
        el.appendChild(inp);
      }
    }
  }

  function getMatrix(id, rows, cols) {
    const m = [];
    for (let r = 0; r < rows; r++) {
      m.push([]);
      for (let c = 0; c < cols; c++) {
        m[r].push(parseFloat(document.getElementById(`m${id}-${r}-${c}`)?.value) || 0);
      }
    }
    return m;
  }

  function resizeMatrix(id) {
    const rEl = document.getElementById(`rows-${id}`);
    const cEl = document.getElementById(`cols-${id}`);
    if (!rEl || !cEl) return;
    const rows = parseInt(rEl.value) || 2;
    const cols = parseInt(cEl.value) || 2;
    if (id === 'A') { rowsA = rows; colsA = cols; }
    else { rowsB = rows; colsB = cols; }
    buildMatrix(id, rows, cols);
  }

  function add() {
    const A = getMatrix('A', rowsA, colsA), B = getMatrix('B', rowsB, colsB);
    if (rowsA !== rowsB || colsA !== colsB) return showResult(null, 'Matrices must be the same size for addition.');
    const R = A.map((row, r) => row.map((v, c) => v + B[r][c]));
    showResult(R, 'A + B');
  }

  function subtract() {
    const A = getMatrix('A', rowsA, colsA), B = getMatrix('B', rowsB, colsB);
    if (rowsA !== rowsB || colsA !== colsB) return showResult(null, 'Matrices must be the same size for subtraction.');
    const R = A.map((row, r) => row.map((v, c) => v - B[r][c]));
    showResult(R, 'A − B');
  }

  function multiply() {
    const A = getMatrix('A', rowsA, colsA), B = getMatrix('B', rowsB, colsB);
    if (colsA !== rowsB) return showResult(null, `Cannot multiply: A columns (${colsA}) ≠ B rows (${rowsB})`);
    const R = Array.from({length: rowsA}, () => new Array(colsB).fill(0));
    for (let r = 0; r < rowsA; r++)
      for (let c = 0; c < colsB; c++)
        for (let k = 0; k < colsA; k++) R[r][c] += A[r][k] * B[k][c];
    showResult(R, 'A × B');
  }

  function determinant() {
    const A = getMatrix('A', rowsA, colsA);
    if (rowsA !== colsA) return showResult(null, 'Determinant requires a square matrix.');
    const det = calcDet(A);
    showScalar(`det(A) = ${formatNum(det)}`, 'Determinant');
  }

  function calcDet(m) {
    const n = m.length;
    if (n === 1) return m[0][0];
    if (n === 2) return m[0][0]*m[1][1] - m[0][1]*m[1][0];
    let det = 0;
    for (let j = 0; j < n; j++) {
      det += Math.pow(-1, j) * m[0][j] * calcDet(m.slice(1).map(row => row.filter((_, c) => c !== j)));
    }
    return det;
  }

  function inverse() {
    const A = getMatrix('A', rowsA, colsA);
    if (rowsA !== colsA) return showResult(null, 'Inverse requires a square matrix.');
    const det = calcDet(A);
    if (Math.abs(det) < 1e-10) return showResult(null, 'Matrix is singular (det = 0), no inverse exists.');
    const n = rowsA;
    const inv = calcInverse(A, det);
    showResult(inv, 'A⁻¹');
  }

  function calcInverse(A, det) {
    const n = A.length;
    if (n === 2) {
      return [[A[1][1]/det, -A[0][1]/det], [-A[1][0]/det, A[0][0]/det]];
    }
    // Cofactor method
    const cofMatrix = Array.from({length:n}, () => new Array(n).fill(0));
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        const minor = A.filter((_, ri) => ri !== r).map(row => row.filter((_, ci) => ci !== c));
        cofMatrix[r][c] = Math.pow(-1, r+c) * calcDet(minor);
      }
    }
    // Transpose cofactor matrix (adjugate), divide by det
    return cofMatrix[0].map((_, c) => cofMatrix.map(row => row[c] / det));
  }

  function transpose() {
    const A = getMatrix('A', rowsA, colsA);
    const R = A[0].map((_, c) => A.map(row => row[c]));
    showResult(R, 'Aᵀ');
  }

  function power() {
    const A = getMatrix('A', rowsA, colsA);
    if (rowsA !== colsA) return showResult(null, 'Power requires a square matrix.');
    const n = parseInt(document.getElementById('mat-power')?.value) || 2;
    if (n < 0 || n > 10) return showResult(null, 'Power must be between 0 and 10.');
    let R = A;
    for (let i = 1; i < n; i++) R = matMul(R, A, rowsA);
    showResult(R, `A^${n}`);
  }

  function matMul(A, B, n) {
    const R = Array.from({length:n}, () => new Array(n).fill(0));
    for (let r = 0; r < n; r++)
      for (let c = 0; c < n; c++)
        for (let k = 0; k < n; k++) R[r][c] += A[r][k] * B[k][c];
    return R;
  }

  function formatNum(n) {
    if (Math.abs(n) < 1e-10) return '0';
    if (Math.abs(n) >= 1e6) return n.toExponential(3);
    return parseFloat(n.toPrecision(6)).toString();
  }

  function showResult(matrix, label) {
    const el = document.getElementById('matrix-result');
    if (!el) return;
    if (!matrix) {
      el.innerHTML = `<div class="matrix-error">${label}</div>`;
      return;
    }
    const cols = matrix[0].length;
    el.innerHTML = `
      <div class="matrix-result-label">${label} =</div>
      <div class="matrix-result-grid" style="grid-template-columns:repeat(${cols},1fr)">
        ${matrix.map(row => row.map(v =>
          `<div class="matrix-result-cell" style="color:${v < 0 ? '#f72585' : v === 0 ? '#888' : '#00f5d4'}">${formatNum(v)}</div>`
        ).join('')).join('')}
      </div>`;
  }

  function showScalar(text, label) {
    const el = document.getElementById('matrix-result');
    if (!el) return;
    el.innerHTML = `<div class="matrix-scalar-result"><span class="scalar-label">${label}</span><span class="scalar-value">${text}</span></div>`;
  }

  function clearAll() {
    document.querySelectorAll('.matrix-cell').forEach(c => c.value = '');
    const el = document.getElementById('matrix-result');
    if (el) el.innerHTML = '';
  }

  function fillRandom(id) {
    const rows = id === 'A' ? rowsA : rowsB;
    const cols = id === 'A' ? colsA : colsB;
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++) {
        const inp = document.getElementById(`m${id}-${r}-${c}`);
        if (inp) inp.value = Math.floor(Math.random() * 19) - 9;
      }
  }

  function fillIdentity(id) {
    const rows = id === 'A' ? rowsA : rowsB;
    const cols = id === 'A' ? colsA : colsB;
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++) {
        const inp = document.getElementById(`m${id}-${r}-${c}`);
        if (inp) inp.value = r === c ? 1 : 0;
      }
  }

  return { init, resizeMatrix, add, subtract, multiply, determinant, inverse, transpose, power, clearAll, fillRandom, fillIdentity };
})();
