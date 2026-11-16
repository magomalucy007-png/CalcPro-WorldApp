// Main App Controller
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

const App = (() => {
  const tabs = ['scientific', 'graphing', 'units', 'matrix', 'equations', 'currency', 'challenges'];
  let activeTab = 'scientific';

  function initTheme() {
    const saved = localStorage.getItem('calcpro-theme') || 'dark';
    setTheme(saved);
    const toggle = document.getElementById('theme-toggle-checkbox');
    if (toggle) toggle.checked = (saved === 'light');
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('calcpro-theme', theme); } catch {}
    const themeLabel = document.getElementById('theme-label');
    if (themeLabel) themeLabel.textContent = theme === 'light' ? 'Light' : 'Dark';
    if (window.GraphingCalc && typeof GraphingCalc.draw === 'function') {
      GraphingCalc.draw();
    }
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    setTheme(next);
    showToast(`Switched to ${next === 'light' ? 'Light ☀️' : 'Dark 🌙'} mode`, 'info');
  }

  function init() {
    initTheme();
    switchTab('scientific');
    ScientificCalc.init();
    UnitConverter.init();
    MatrixCalc.init();
    EquationSolver.init();
    CurrencyConverter.init();
    if (window.ChallengeMode) ChallengeMode.init();

    // Smooth tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    // Animate on load
    document.body.classList.add('loaded');
  }

  function switchTab(tab) {
    activeTab = tab;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
    document.querySelectorAll('.tab-content').forEach(c => {
      const isActive = c.id === `tab-${tab}`;
      c.classList.toggle('active', isActive);
    });

    // Init graphing lazily on first open
    if (tab === 'graphing') {
      setTimeout(() => GraphingCalc.init(), 50);
    }
  }

  return { init, switchTab, toggleTheme, setTheme };
})();

document.addEventListener('DOMContentLoaded', App.init);
