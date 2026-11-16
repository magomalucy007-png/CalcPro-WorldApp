// Challenge Section Module
const ChallengeMode = (() => {
  const challenges = [
    {
      id: 1,
      title: "Order of Operations",
      category: "Arithmetic",
      difficulty: "Easy",
      question: "Calculate the exact value of:<br><strong>(18 ÷ 3)² + 4 × (15 − 7) − √64</strong>",
      mathExpr: "(18/3)^2 + 4*(15-7) - sqrt(64)",
      answer: 60,
      tolerance: 0.01,
      hint1: "Apply PEMDAS: Solve the parentheses first (18 ÷ 3 and 15 − 7).",
      hint2: "6² = 36, 4 × 8 = 32, and √64 = 8. Now combine them: 36 + 32 − 8.",
      steps: [
        "Simplify inside parentheses: (18 ÷ 3) = 6 and (15 − 7) = 8",
        "Evaluate powers and roots: 6² = 36 and √64 = 8",
        "Perform multiplication: 4 × 8 = 32",
        "Perform addition and subtraction: 36 + 32 − 8 = 60"
      ]
    },
    {
      id: 2,
      title: "Linear Equation",
      category: "Algebra",
      difficulty: "Easy",
      question: "Solve for <strong>x</strong> in:<br><strong>7x − 19 = 3x + 17</strong>",
      mathExpr: "7x - 19 = 3x + 17",
      answer: 9,
      tolerance: 0.01,
      hint1: "Subtract 3x from both sides to gather x on the left.",
      hint2: "4x − 19 = 17 → Add 19 to both sides: 4x = 36. Now divide by 4.",
      steps: [
        "Subtract 3x from both sides: 4x − 19 = 17",
        "Add 19 to both sides: 4x = 36",
        "Divide both sides by 4: x = 36 / 4 = 9"
      ]
    },
    {
      id: 3,
      title: "Trigonometric Exact Value",
      category: "Trigonometry",
      difficulty: "Medium",
      question: "Evaluate in degrees:<br><strong>2 × sin(30°) + 4 × cos(60°) − tan(45°)</strong>",
      mathExpr: "2*sin(30) + 4*cos(60) - tan(45)",
      answer: 2,
      tolerance: 0.01,
      hint1: "Recall standard unit circle angles: sin(30°) = 0.5, cos(60°) = 0.5, tan(45°) = 1.",
      hint2: "Substitute: 2(0.5) + 4(0.5) − 1. Compute each term.",
      steps: [
        "sin(30°) = 0.5, so 2 × sin(30°) = 1",
        "cos(60°) = 0.5, so 4 × cos(60°) = 2",
        "tan(45°) = 1",
        "Combine: 1 + 2 − 1 = 2"
      ]
    },
    {
      id: 4,
      title: "Quadratic Roots",
      category: "Algebra",
      difficulty: "Medium",
      question: "Find the <strong>positive root</strong> of:<br><strong>x² − 5x − 24 = 0</strong>",
      mathExpr: "x^2 - 5x - 24 = 0",
      answer: 8,
      tolerance: 0.01,
      hint1: "Factor into (x − a)(x + b) = 0 where a × b = 24 and -a + b = -5.",
      hint2: "Factors of 24 with difference 5 are 8 and 3: (x − 8)(x + 3) = 0.",
      steps: [
        "Factoring: Find two numbers that multiply to −24 and add to −5 → (−8 and 3)",
        "Write as: (x − 8)(x + 3) = 0",
        "Roots are x = 8 and x = −3",
        "The positive root is x = 8"
      ]
    },
    {
      id: 5,
      title: "Matrix Determinant",
      category: "Matrix",
      difficulty: "Medium",
      question: "Find the determinant of matrix A:<br><strong>A = [ [6, 4], [2, 5] ]</strong>",
      mathExpr: "det([[6, 4], [2, 5]])",
      answer: 22,
      tolerance: 0.01,
      hint1: "For a 2×2 matrix [[a, b], [c, d]], det(A) = ad − bc.",
      hint2: "Compute: 6 × 5 − 4 × 2.",
      steps: [
        "Formula: det = (top-left × bottom-right) − (top-right × bottom-left)",
        "det = (6 × 5) − (4 × 2)",
        "det = 30 − 8 = 22"
      ]
    },
    {
      id: 6,
      title: "Unit Conversion: Speed",
      category: "Units",
      difficulty: "Easy",
      question: "A car is driving at <strong>90 km/h</strong>. What is this speed in <strong>m/s</strong>? (meters per second)",
      mathExpr: "90 km/h to m/s",
      answer: 25,
      tolerance: 0.05,
      hint1: "1 km/h = 1000m / 3600s = 1 / 3.6 m/s.",
      hint2: "Divide 90 by 3.6.",
      steps: [
        "Conversion factor: 1 km/h = 1/3.6 m/s",
        "Compute: 90 ÷ 3.6",
        "90 ÷ 3.6 = 25 m/s"
      ]
    },
    {
      id: 7,
      title: "Factorial Ratio",
      category: "Arithmetic",
      difficulty: "Easy",
      question: "Calculate the exact value of:<br><strong>8! ÷ (5! × 3!)</strong>",
      mathExpr: "8! / (5! * 3!)",
      answer: 56,
      tolerance: 0.01,
      hint1: "Expand 8! as 8 × 7 × 6 × 5! so the 5! cancels out.",
      hint2: "This leaves (8 × 7 × 6) ÷ (3 × 2 × 1). Note that 3 × 2 × 1 = 6.",
      steps: [
        "Cancel 5! from numerator: (8 × 7 × 6 × 5!) / (5! × 6) = (8 × 7 × 6) / 6",
        "Cancel 6: 8 × 7 = 56",
        "Result = 56 (Also known as 8 choose 3)"
      ]
    },
    {
      id: 8,
      title: "Logarithmic Equation",
      category: "Algebra",
      difficulty: "Medium",
      question: "Calculate the value of:<br><strong>log₁₀(1000) + ln(e⁵) − log₂(32)</strong>",
      mathExpr: "log10(1000) + ln(e^5) - log2(32)",
      answer: 3,
      tolerance: 0.01,
      hint1: "10³ = 1000, so log₁₀(1000) = 3.",
      hint2: "ln(e⁵) = 5, and 2⁵ = 32 so log₂(32) = 5. Now calculate: 3 + 5 − 5.",
      steps: [
        "log₁₀(1000) = 3 because 10³ = 1000",
        "ln(e⁵) = 5 because ln and e are inverses",
        "log₂(32) = 5 because 2⁵ = 32",
        "Combine: 3 + 5 − 5 = 3"
      ]
    },
    {
      id: 9,
      title: "Pythagorean Theorem",
      category: "Geometry",
      difficulty: "Easy",
      question: "A right triangle has legs of length <strong>15 cm</strong> and <strong>20 cm</strong>. What is the length of its hypotenuse?",
      mathExpr: "sqrt(15^2 + 20^2)",
      answer: 25,
      tolerance: 0.01,
      hint1: "Use c = √(a² + b²).",
      hint2: "15² = 225, 20² = 400. Add them: 225 + 400 = 625. Now find √625.",
      steps: [
        "Formula: c² = a² + b²",
        "c² = 15² + 20² = 225 + 400 = 625",
        "c = √625 = 25 cm"
      ]
    },
    {
      id: 10,
      title: "System of 2 Equations",
      category: "Algebra",
      difficulty: "Hard",
      question: "Solve the system for <strong>x</strong>:<br><strong>2x + 3y = 20</strong><br><strong>5x − 2y = 12</strong>",
      mathExpr: "2x + 3y = 20, 5x - 2y = 12",
      answer: 4,
      tolerance: 0.01,
      hint1: "Multiply the first equation by 2 and the second equation by 3 to eliminate y.",
      hint2: "4x + 6y = 40 and 15x − 6y = 36. Add them: 19x = 76.",
      steps: [
        "Multiply Eq 1 by 2: 4x + 6y = 40",
        "Multiply Eq 2 by 3: 15x − 6y = 36",
        "Add the equations: (4x + 15x) + (6y − 6y) = 40 + 36 → 19x = 76",
        "Divide by 19: x = 76 / 19 = 4 (and y = 4)"
      ]
    },
    {
      id: 11,
      title: "Temperature Conversion",
      category: "Units",
      difficulty: "Easy",
      question: "Convert <strong>86°F</strong> (Fahrenheit) into <strong>Celsius (°C)</strong>.",
      mathExpr: "(86 - 32) * 5/9",
      answer: 30,
      tolerance: 0.01,
      hint1: "Formula: °C = (°F − 32) × 5/9.",
      hint2: "86 − 32 = 54. Now multiply 54 by 5/9.",
      steps: [
        "Formula: °C = (°F − 32) × 5 / 9",
        "Subtract 32: 86 − 32 = 54",
        "Multiply by 5/9: 54 × 5 / 9 = 30°C"
      ]
    },
    {
      id: 12,
      title: "Compound Percentage",
      category: "Arithmetic",
      difficulty: "Medium",
      question: "An item costs $200. It is discounted by <strong>20%</strong>, and then an additional <strong>10%</strong> discount is applied to the new price. What is the final price?",
      mathExpr: "200 * 0.80 * 0.90",
      answer: 144,
      tolerance: 0.01,
      hint1: "Do not simply add 20% + 10%. Apply each discount successively.",
      hint2: "After 20% off: 200 × 0.8 = 160. Then 10% off of 160: 160 × 0.9.",
      steps: [
        "First discount: $200 × (1 − 0.20) = $200 × 0.80 = $160",
        "Second discount: $160 × (1 − 0.10) = $160 × 0.90 = $144",
        "Final price = $144"
      ]
    },
    {
      id: 13,
      title: "Exponents and Powers",
      category: "Arithmetic",
      difficulty: "Medium",
      question: "Calculate the value of:<br><strong>(2³)² × 2⁴ ÷ 2⁸</strong>",
      mathExpr: "(2^3)^2 * 2^4 / 2^8",
      answer: 4,
      tolerance: 0.01,
      hint1: "Use exponent laws: (aᵐ)ⁿ = a^(m×n), and aᵐ × aⁿ = a^(m+n), aᵐ ÷ aⁿ = a^(m-n).",
      hint2: "(2³)² = 2⁶. 2⁶ × 2⁴ = 2¹⁰. 2¹⁰ ÷ 2⁸ = 2².",
      steps: [
        "(2³)² = 2^(3×2) = 2⁶",
        "Multiply: 2⁶ × 2⁴ = 2^(6+4) = 2¹⁰",
        "Divide: 2¹⁰ ÷ 2⁸ = 2^(10−8) = 2²",
        "Evaluate: 2² = 4"
      ]
    },
    {
      id: 14,
      title: "Circle Circumference & Diameter",
      category: "Geometry",
      difficulty: "Medium",
      question: "If a circle has an area of <strong>49π cm²</strong>, what is its <strong>diameter</strong> in cm?",
      mathExpr: "2 * sqrt(49)",
      answer: 14,
      tolerance: 0.01,
      hint1: "Area = π × r². Since Area = 49π, what is r?",
      hint2: "r² = 49 → r = 7 cm. Diameter = 2r.",
      steps: [
        "Area formula: A = πr² = 49π",
        "Divide by π: r² = 49 → r = 7 cm",
        "Diameter = 2 × radius = 2 × 7 = 14 cm"
      ]
    },
    {
      id: 15,
      title: "Arithmetic Series Sum",
      category: "Algebra",
      difficulty: "Hard",
      question: "Calculate the sum of the first <strong>40 positive integers</strong>:<br><strong>1 + 2 + 3 + ... + 40</strong>",
      mathExpr: "40 * (40 + 1) / 2",
      answer: 820,
      tolerance: 0.01,
      hint1: "Use Gauss's formula for the sum of the first n integers: S = n(n + 1) / 2.",
      hint2: "Here n = 40. Compute 40 × 41 ÷ 2.",
      steps: [
        "Formula: S = n(n + 1) / 2",
        "Substitute n = 40: S = 40 × 41 / 2",
        "Compute: 20 × 41 = 820"
      ]
    }
  ];

  let currentIndex = 0;
  let currentFilteredList = [...challenges];
  let activeCategory = 'All';
  let activeDifficulty = 'All';
  let hintsRevealed = 0;
  let userAttempts = 0;
  let solutionRevealed = false;

  // Persistent storage keys
  const STORAGE_HISTORY = 'calcpro-challenge-history';
  const STORAGE_STATS = 'calcpro-challenge-stats';

  function getHistory() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_HISTORY)) || [];
    } catch {
      return [];
    }
  }

  function saveHistoryItem(item) {
    const history = getHistory();
    history.unshift(item);
    if (history.length > 50) history.pop();
    try {
      localStorage.setItem(STORAGE_HISTORY, JSON.stringify(history));
    } catch {}
    renderHistory();
  }

  function getStats() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_STATS)) || { solved: 0, attempted: 0, streak: 0 };
    } catch {
      return { solved: 0, attempted: 0, streak: 0 };
    }
  }

  function updateStats(isCorrect) {
    const stats = getStats();
    stats.attempted += 1;
    if (isCorrect) {
      stats.solved += 1;
      stats.streak += 1;
    } else {
      stats.streak = 0;
    }
    try {
      localStorage.setItem(STORAGE_STATS, JSON.stringify(stats));
    } catch {}
    renderStats();
  }

  function init() {
    filterChallenges();
    renderCurrentChallenge();
    renderHistory();
    renderStats();
  }

  function filterChallenges() {
    currentFilteredList = challenges.filter(c => {
      const matchCat = activeCategory === 'All' || c.category === activeCategory;
      const matchDiff = activeDifficulty === 'All' || c.difficulty === activeDifficulty;
      return matchCat && matchDiff;
    });

    if (currentFilteredList.length === 0) {
      currentFilteredList = [...challenges];
      activeCategory = 'All';
      activeDifficulty = 'All';
    }

    currentIndex = 0;
  }

  function setCategory(cat) {
    activeCategory = cat;
    document.querySelectorAll('.ch-cat-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.cat === cat);
    });
    filterChallenges();
    renderCurrentChallenge();
  }

  function setDifficulty(diff) {
    activeDifficulty = diff;
    document.querySelectorAll('.ch-diff-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.diff === diff);
    });
    filterChallenges();
    renderCurrentChallenge();
  }

  function nextChallenge() {
    if (currentIndex < currentFilteredList.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    renderCurrentChallenge();
  }

  function prevChallenge() {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = currentFilteredList.length - 1;
    }
    renderCurrentChallenge();
  }

  function randomChallenge() {
    currentIndex = Math.floor(Math.random() * currentFilteredList.length);
    renderCurrentChallenge();
  }

  function renderCurrentChallenge() {
    const q = currentFilteredList[currentIndex];
    if (!q) return;

    hintsRevealed = 0;
    userAttempts = 0;
    solutionRevealed = false;

    // Counter
    const counterEl = document.getElementById('ch-counter');
    if (counterEl) counterEl.textContent = `Challenge ${currentIndex + 1} of ${currentFilteredList.length}`;

    // Category and difficulty badges
    const badgeCat = document.getElementById('ch-badge-category');
    if (badgeCat) badgeCat.textContent = q.category;

    const badgeDiff = document.getElementById('ch-badge-difficulty');
    if (badgeDiff) {
      badgeDiff.textContent = q.difficulty;
      badgeDiff.className = `ch-badge ch-diff-${q.difficulty.toLowerCase()}`;
    }

    // Title & prompt
    const titleEl = document.getElementById('ch-title');
    if (titleEl) titleEl.textContent = q.title;

    const promptEl = document.getElementById('ch-prompt');
    if (promptEl) promptEl.innerHTML = q.question;

    // Reset input and states
    const inp = document.getElementById('ch-input');
    if (inp) {
      inp.value = '';
      inp.disabled = false;
      inp.focus();
    }

    const checkBtn = document.getElementById('ch-check-btn');
    if (checkBtn) checkBtn.disabled = false;

    // Reset feedback and solution area
    const feedbackEl = document.getElementById('ch-feedback');
    if (feedbackEl) {
      feedbackEl.innerHTML = '';
      feedbackEl.className = 'ch-feedback-wrap';
    }

    const hintBox = document.getElementById('ch-hint-box');
    if (hintBox) {
      hintBox.innerHTML = '';
      hintBox.style.display = 'none';
    }

    const hintBtn = document.getElementById('ch-hint-btn');
    if (hintBtn) hintBtn.textContent = '💡 Hint (2 remaining)';

    const solutionBox = document.getElementById('ch-solution-box');
    if (solutionBox) {
      solutionBox.innerHTML = '';
      solutionBox.style.display = 'none';
    }

    const giveUpBtn = document.getElementById('ch-giveup-btn');
    if (giveUpBtn) {
      giveUpBtn.style.display = 'none';
    }
  }

  function parseUserAnswer(raw) {
    if (!raw) return NaN;
    raw = raw.trim();
    // Allow fractions e.g. "3/4"
    if (/^-?\d+(\.\d+)?\s*\/\s*-?\d+(\.\d+)?$/.test(raw)) {
      const parts = raw.split('/');
      return parseFloat(parts[0]) / parseFloat(parts[1]);
    }
    return parseFloat(raw);
  }

  function checkAnswer() {
    const q = currentFilteredList[currentIndex];
    if (!q) return;

    const inp = document.getElementById('ch-input');
    const val = inp?.value?.trim();

    if (!val && val !== '0') {
      showToast('Please type your answer before checking!', 'info');
      inp?.focus();
      return;
    }

    userAttempts++;
    const parsed = parseUserAnswer(val);

    if (isNaN(parsed)) {
      showToast('Please enter a valid number or fraction!', 'danger');
      return;
    }

    const tol = q.tolerance || 0.01;
    const isCorrect = Math.abs(parsed - q.answer) <= tol;

    const feedbackEl = document.getElementById('ch-feedback');

    if (isCorrect) {
      // Correct!
      updateStats(true);
      feedbackEl.className = 'ch-feedback-wrap correct';
      feedbackEl.innerHTML = `
        <div class="ch-feedback-header">
          <span class="ch-feedback-icon">🎉</span>
          <div>
            <strong>Outstanding! That is correct.</strong>
            <p>Your answer: <code>${val}</code></p>
          </div>
        </div>
      `;

      inp.disabled = true;
      document.getElementById('ch-check-btn').disabled = true;
      showToast('Correct! Great job! 🚀', 'success');

      // Reveal full step-by-step
      revealSolution(true, val);

      // Save into Solution History
      saveHistoryItem({
        id: Date.now(),
        challengeId: q.id,
        title: q.title,
        category: q.category,
        difficulty: q.difficulty,
        question: q.question,
        userAnswer: val,
        correctAnswer: q.answer,
        status: 'SOLVED',
        attempts: userAttempts,
        steps: q.steps,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });

      // Also forward into the main calculator history!
      if (window.ScientificCalc && typeof ScientificCalc.addHistory === 'function') {
        ScientificCalc.addHistory(q.mathExpr || q.title, `${q.answer} [Challenge ✓]`);
      }

    } else {
      // Incorrect - encourage them to try again!
      feedbackEl.className = 'ch-feedback-wrap incorrect';
      feedbackEl.innerHTML = `
        <div class="ch-feedback-header">
          <span class="ch-feedback-icon">🤔</span>
          <div>
            <strong>Not quite!</strong>
            <p>You entered <code>${val}</code>. Check your calculations and try again, or take a hint below.</p>
          </div>
        </div>
      `;

      // Enable give up button after at least 1 attempt
      const giveUpBtn = document.getElementById('ch-giveup-btn');
      if (giveUpBtn) giveUpBtn.style.display = 'inline-flex';

      showToast('Not quite! Try again or use a hint.', 'info');
      inp.select();
    }
  }

  function showHint() {
    const q = currentFilteredList[currentIndex];
    if (!q) return;

    const hintBox = document.getElementById('ch-hint-box');
    const hintBtn = document.getElementById('ch-hint-btn');
    if (!hintBox || !hintBtn) return;

    hintsRevealed++;
    hintBox.style.display = 'block';

    if (hintsRevealed === 1) {
      hintBox.innerHTML = `
        <div class="ch-hint-item">
          <strong>💡 Hint 1:</strong> ${q.hint1}
        </div>
      `;
      hintBtn.textContent = '💡 Hint 2 (1 remaining)';
    } else {
      hintBox.innerHTML = `
        <div class="ch-hint-item">
          <strong>💡 Hint 1:</strong> ${q.hint1}
        </div>
        <div class="ch-hint-item">
          <strong>💡 Hint 2:</strong> ${q.hint2}
        </div>
      `;
      hintBtn.textContent = '💡 All hints revealed';
      hintBtn.disabled = true;
    }
  }

  function giveUp() {
    const q = currentFilteredList[currentIndex];
    if (!q) return;

    const inp = document.getElementById('ch-input');
    const val = inp?.value?.trim() || '(None)';

    solutionRevealed = true;
    updateStats(false);

    revealSolution(false, val);

    // Save into history as revealed
    saveHistoryItem({
      id: Date.now(),
      challengeId: q.id,
      title: q.title,
      category: q.category,
      difficulty: q.difficulty,
      question: q.question,
      userAnswer: val,
      correctAnswer: q.answer,
      status: 'REVEALED',
      attempts: userAttempts,
      steps: q.steps,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    if (window.ScientificCalc && typeof ScientificCalc.addHistory === 'function') {
      ScientificCalc.addHistory(q.mathExpr || q.title, `${q.answer} [Solution]`);
    }

    document.getElementById('ch-check-btn').disabled = true;
    document.getElementById('ch-giveup-btn').style.display = 'none';
  }

  function revealSolution(isSolved, userVal) {
    const q = currentFilteredList[currentIndex];
    if (!q) return;

    const box = document.getElementById('ch-solution-box');
    if (!box) return;

    box.style.display = 'block';
    box.innerHTML = `
      <div class="ch-solution-header">
        <span class="ch-sol-tag">${isSolved ? '✅ Solution Confirmed' : '👁️ Solution Revealed'}</span>
        <span class="ch-sol-ans">Answer = <strong>${q.answer}</strong></span>
      </div>
      <div class="ch-solution-steps">
        <div class="ch-steps-heading">Step-by-Step Breakdown:</div>
        <ol class="ch-steps-list">
          ${q.steps.map(s => `<li>${s}</li>`).join('')}
        </ol>
      </div>
    `;
  }

  function renderStats() {
    const stats = getStats();
    const solvedEl = document.getElementById('ch-stat-solved');
    const streakEl = document.getElementById('ch-stat-streak');
    if (solvedEl) solvedEl.textContent = stats.solved;
    if (streakEl) streakEl.textContent = stats.streak;
  }

  function renderHistory() {
    const list = getHistory();
    const container = document.getElementById('ch-history-list');
    if (!container) return;

    if (list.length === 0) {
      container.innerHTML = `
        <div class="ch-history-empty">
          No challenges attempted yet.<br>Solve a challenge above to start building your solution history! 🚀
        </div>
      `;
      return;
    }

    container.innerHTML = list.map(item => `
      <div class="ch-history-card ${item.status === 'SOLVED' ? 'status-solved' : 'status-revealed'}">
        <div class="ch-hcard-header">
          <div class="ch-hcard-meta">
            <span class="ch-hcard-badge ${item.status === 'SOLVED' ? 'badge-solved' : 'badge-revealed'}">
              ${item.status === 'SOLVED' ? '✓ Solved' : '👁 Revealed'}
            </span>
            <span class="ch-hcard-cat">${item.category}</span>
            <span class="ch-hcard-time">${item.timestamp}</span>
          </div>
          <div class="ch-hcard-title">${item.title}</div>
        </div>
        <div class="ch-hcard-body">
          <div class="ch-hcard-compare">
            <span>Your input: <strong>${item.userAnswer}</strong></span>
            <span>Correct answer: <strong>${item.correctAnswer}</strong></span>
          </div>
          <details class="ch-hcard-steps">
            <summary>View Steps</summary>
            <ol>
              ${(item.steps || []).map(s => `<li>${s}</li>`).join('')}
            </ol>
          </details>
        </div>
      </div>
    `).join('');
  }

  function clearHistory() {
    try {
      localStorage.removeItem(STORAGE_HISTORY);
    } catch {}
    renderHistory();
    showToast('Challenge history cleared', 'info');
  }

  return {
    init,
    setCategory,
    setDifficulty,
    nextChallenge,
    prevChallenge,
    randomChallenge,
    checkAnswer,
    showHint,
    giveUp,
    clearHistory
  };
})();
