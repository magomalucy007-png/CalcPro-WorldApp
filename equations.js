// Equation Solver Module
const EquationSolver = (() => {
  let mode = 'linear';

  function init() {
    switchMode('linear');
  }

  function switchMode(m) {
    mode = m;
    document.querySelectorAll('.eq-mode-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === m);
    });
    renderUI(m);
  }

  function renderUI(m) {
    const body = document.getElementById('eq-body');
    if (!body) return;

    if (m === 'linear') {
      body.innerHTML = `
        <div class="eq-description">Solve: <span class="eq-formula">ax + b = c</span></div>
        <div class="eq-inputs-row">
          <div class="eq-input-group">
            <input type="number" id="eq-a" class="eq-inp" placeholder="a" />
            <label>a (coefficient of x)</label>
          </div>
          <div class="eq-input-group">
            <input type="number" id="eq-b" class="eq-inp" placeholder="b" />
            <label>b (constant)</label>
          </div>
          <div class="eq-input-group">
            <input type="number" id="eq-c" class="eq-inp" placeholder="c" />
            <label>c (right side)</label>
          </div>
        </div>
        <button class="eq-solve-btn" onclick="EquationSolver.solve()">Solve →</button>
        <div id="eq-result"></div>`;
    } else if (m === 'quadratic') {
      body.innerHTML = `
        <div class="eq-description">Solve: <span class="eq-formula">ax² + bx + c = 0</span></div>
        <div class="eq-inputs-row">
          <div class="eq-input-group">
            <input type="number" id="eq-a" class="eq-inp" placeholder="a" />
            <label>a (x² coefficient)</label>
          </div>
          <div class="eq-input-group">
            <input type="number" id="eq-b" class="eq-inp" placeholder="b" />
            <label>b (x coefficient)</label>
          </div>
          <div class="eq-input-group">
            <input type="number" id="eq-c" class="eq-inp" placeholder="c" />
            <label>c (constant)</label>
          </div>
        </div>
        <button class="eq-solve-btn" onclick="EquationSolver.solve()">Solve →</button>
        <div id="eq-result"></div>`;
    } else if (m === 'system') {
      body.innerHTML = `
        <div class="eq-description">Solve: <span class="eq-formula">a₁x + b₁y = c₁ &nbsp;&amp;&nbsp; a₂x + b₂y = c₂</span></div>
        <div class="eq-system-grid">
          <div class="eq-system-row">
            <span class="eq-eq-num">Eq 1:</span>
            <input type="number" id="eq-a1" class="eq-inp sm" placeholder="a₁" />
            <span class="eq-var">x +</span>
            <input type="number" id="eq-b1" class="eq-inp sm" placeholder="b₁" />
            <span class="eq-var">y =</span>
            <input type="number" id="eq-c1" class="eq-inp sm" placeholder="c₁" />
          </div>
          <div class="eq-system-row">
            <span class="eq-eq-num">Eq 2:</span>
            <input type="number" id="eq-a2" class="eq-inp sm" placeholder="a₂" />
            <span class="eq-var">x +</span>
            <input type="number" id="eq-b2" class="eq-inp sm" placeholder="b₂" />
            <span class="eq-var">y =</span>
            <input type="number" id="eq-c2" class="eq-inp sm" placeholder="c₂" />
          </div>
        </div>
        <button class="eq-solve-btn" onclick="EquationSolver.solve()">Solve →</button>
        <div id="eq-result"></div>`;
    } else if (m === 'cubic') {
      body.innerHTML = `
        <div class="eq-description">Solve: <span class="eq-formula">ax³ + bx² + cx + d = 0</span></div>
        <div class="eq-inputs-row">
          <div class="eq-input-group">
            <input type="number" id="eq-a" class="eq-inp" placeholder="a" />
            <label>a (x³)</label>
          </div>
          <div class="eq-input-group">
            <input type="number" id="eq-b" class="eq-inp" placeholder="b" />
            <label>b (x²)</label>
          </div>
          <div class="eq-input-group">
            <input type="number" id="eq-c" class="eq-inp" placeholder="c" />
            <label>c (x)</label>
          </div>
          <div class="eq-input-group">
            <input type="number" id="eq-d" class="eq-inp" placeholder="d" />
            <label>d (constant)</label>
          </div>
        </div>
        <button class="eq-solve-btn" onclick="EquationSolver.solve()">Solve →</button>
        <div id="eq-result"></div>`;
    }
  }

  function solve() {
    if (mode === 'linear') solveLinear();
    else if (mode === 'quadratic') solveQuadratic();
    else if (mode === 'system') solveSystem();
    else if (mode === 'cubic') solveCubic();
  }

  function g(id) { return parseFloat(document.getElementById(id)?.value); }
  function fmt(n) { return parseFloat(n.toPrecision(10)).toString(); }

  function solveLinear() {
    const a = g('eq-a'), b = g('eq-b'), c = g('eq-c');
    if (isNaN(a) || isNaN(b) || isNaN(c)) return showResult('<p class="eq-err">Please fill all fields.</p>');
    if (a === 0) {
      if (b === c) return showResult(steps('Linear', 'Infinite solutions (0 = 0)', []));
      return showResult(steps('Linear', 'No solution (0 ≠ value)', []));
    }
    const x = (c - b) / a;
    showResult(steps('Linear', `x = ${fmt(x)}`, [
      `${a}x + ${b} = ${c}`,
      `${a}x = ${c} − ${b} = ${c - b}`,
      `x = ${c - b} ÷ ${a} = <strong>${fmt(x)}</strong>`
    ]));
  }

  function solveQuadratic() {
    const a = g('eq-a'), b = g('eq-b'), c = g('eq-c');
    if (isNaN(a) || isNaN(b) || isNaN(c)) return showResult('<p class="eq-err">Please fill all fields.</p>');
    if (a === 0) return showResult('<p class="eq-err">a cannot be 0 for quadratic.</p>');
    const disc = b*b - 4*a*c;
    const vertex = `Vertex: (${fmt(-b/(2*a))}, ${fmt(c - b*b/(4*a))})`;

    if (disc > 0) {
      const x1 = (-b + Math.sqrt(disc)) / (2*a);
      const x2 = (-b - Math.sqrt(disc)) / (2*a);
      showResult(steps('Quadratic', `x₁ = ${fmt(x1)}, x₂ = ${fmt(x2)}`, [
        `Discriminant Δ = b² − 4ac = ${b}² − 4(${a})(${c}) = ${fmt(disc)}`,
        `Δ > 0 → Two distinct real roots`,
        `x = (−b ± √Δ) / 2a`,
        `x₁ = (${-b} + √${fmt(disc)}) / ${2*a} = <strong>${fmt(x1)}</strong>`,
        `x₂ = (${-b} − √${fmt(disc)}) / ${2*a} = <strong>${fmt(x2)}</strong>`,
        `<em>${vertex}</em>`
      ]));
    } else if (disc === 0) {
      const x = -b / (2*a);
      showResult(steps('Quadratic', `x = ${fmt(x)} (double root)`, [
        `Discriminant Δ = ${fmt(disc)} → One real root (double)`,
        `x = −b / 2a = ${-b} / ${2*a} = <strong>${fmt(x)}</strong>`,
        `<em>${vertex}</em>`
      ]));
    } else {
      const realPart = -b / (2*a);
      const imagPart = Math.sqrt(-disc) / (2*a);
      showResult(steps('Quadratic', 'Complex roots', [
        `Discriminant Δ = ${fmt(disc)} < 0 → Complex roots`,
        `x₁ = ${fmt(realPart)} + ${fmt(imagPart)}i`,
        `x₂ = ${fmt(realPart)} − ${fmt(imagPart)}i`,
        `<em>${vertex}</em>`
      ]));
    }
  }

  function solveSystem() {
    const a1 = g('eq-a1'), b1 = g('eq-b1'), c1 = g('eq-c1');
    const a2 = g('eq-a2'), b2 = g('eq-b2'), c2 = g('eq-c2');
    if ([a1,b1,c1,a2,b2,c2].some(isNaN)) return showResult('<p class="eq-err">Please fill all fields.</p>');
    const D = a1*b2 - a2*b1;
    if (Math.abs(D) < 1e-10) {
      return showResult(steps('System of Equations', 'No unique solution (D = 0)', [
        `D = a₁b₂ − a₂b₁ = ${a1}×${b2} − ${a2}×${b1} = ${D}`,
        `The system is either dependent (infinite solutions) or inconsistent (no solution).`
      ]));
    }
    const x = (c1*b2 - c2*b1) / D;
    const y = (a1*c2 - a2*c1) / D;
    showResult(steps('System of Equations', `x = ${fmt(x)}, y = ${fmt(y)}`, [
      `Using Cramer's Rule:`,
      `D  = a₁b₂ − a₂b₁ = ${fmt(D)}`,
      `Dₓ = c₁b₂ − c₂b₁ = ${fmt(c1*b2 - c2*b1)}`,
      `D_y = a₁c₂ − a₂c₁ = ${fmt(a1*c2 - a2*c1)}`,
      `x = Dₓ/D = <strong>${fmt(x)}</strong>`,
      `y = D_y/D = <strong>${fmt(y)}</strong>`
    ]));
  }

  function solveCubic() {
    const a = g('eq-a'), b = g('eq-b'), c = g('eq-c'), d = g('eq-d');
    if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d)) return showResult('<p class="eq-err">Please fill all fields.</p>');
    if (a === 0) return showResult('<p class="eq-err">a cannot be 0 for cubic.</p>');

    // Normalize
    const B = b/a, C = c/a, D = d/a;
    const p = C - B*B/3;
    const q = 2*B*B*B/27 - B*C/3 + D;
    const disc = -(4*p*p*p + 27*q*q);
    let rootsText = '';
    const shift = -B/3;

    if (Math.abs(p) < 1e-10 && Math.abs(q) < 1e-10) {
      rootsText = `x = ${fmt(shift)} (triple root)`;
    } else if (disc > 0) {
      // 3 distinct real roots (casus irreducibilis, use trig method)
      const m = 2 * Math.sqrt(-p/3);
      const theta = Math.acos(3*q / (p*m)) / 3;
      const roots = [0,1,2].map(k => m * Math.cos(theta - 2*Math.PI*k/3) + shift);
      rootsText = roots.map((r, i) => `x${i+1} = ${fmt(r)}`).join(', ');
    } else {
      // 1 real root + 2 complex (or repeated)
      const A3 = Math.cbrt(-q/2 + Math.sqrt(q*q/4 + p*p*p/27));
      const B3 = Math.cbrt(-q/2 - Math.sqrt(q*q/4 + p*p*p/27));
      const realRoot = A3 + B3 + shift;
      const realPart2 = -(A3+B3)/2 + shift;
      const imagPart2 = Math.sqrt(3)/2 * Math.abs(A3-B3);
      rootsText = `x₁ = ${fmt(realRoot)}, x₂ = ${fmt(realPart2)} + ${fmt(imagPart2)}i, x₃ = ${fmt(realPart2)} − ${fmt(imagPart2)}i`;
    }

    showResult(steps('Cubic', rootsText, [
      `Normalized: x³ + ${fmt(B)}x² + ${fmt(C)}x + ${fmt(D)} = 0`,
      `Discriminant Δ = −(4p³ + 27q²) = ${fmt(disc)}`,
      disc > 0 ? 'Δ > 0 → 3 distinct real roots (trigonometric method)' :
      disc < 0 ? 'Δ < 0 → 1 real root + 2 complex conjugate roots' :
                 'Δ = 0 → Repeated roots',
      `<strong>${rootsText}</strong>`
    ]));
  }

  function steps(title, summary, stepList) {
    return `
      <div class="eq-result-card">
        <div class="eq-result-title">${title} Equation</div>
        <div class="eq-result-summary">${summary}</div>
        ${stepList.length ? `
        <div class="eq-steps-title">Step-by-Step Solution</div>
        <ol class="eq-steps">
          ${stepList.map(s => `<li>${s}</li>`).join('')}
        </ol>` : ''}
      </div>`;
  }

  function showResult(html) {
    const el = document.getElementById('eq-result');
    if (el) el.innerHTML = html;
  }

  return { init, switchMode, solve };
})();
