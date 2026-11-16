// Unit Converter Module
const UnitConverter = (() => {

  const categories = {
    Length: {
      icon: '📏',
      units: {
        Meter: 1, Kilometer: 0.001, Centimeter: 100, Millimeter: 1000,
        Mile: 0.000621371, Yard: 1.09361, Foot: 3.28084, Inch: 39.3701,
        Nautical_Mile: 0.000539957, Light_Year: 1.057e-16
      }
    },
    Mass: {
      icon: '⚖️',
      units: {
        Kilogram: 1, Gram: 1000, Milligram: 1e6, Metric_Ton: 0.001,
        Pound: 2.20462, Ounce: 35.274, Stone: 0.157473, Carat: 5000
      }
    },
    Temperature: {
      icon: '🌡️',
      units: { Celsius: 'C', Fahrenheit: 'F', Kelvin: 'K' },
      special: true
    },
    Speed: {
      icon: '💨',
      units: {
        'm/s': 1, 'km/h': 3.6, 'mph': 2.23694, 'knot': 1.94384,
        'ft/s': 3.28084, 'Mach': 0.00293
      }
    },
    Area: {
      icon: '🔲',
      units: {
        'm²': 1, 'km²': 1e-6, 'cm²': 10000, 'mm²': 1e6,
        'ft²': 10.7639, 'in²': 1550, 'acre': 0.000247105, 'hectare': 0.0001
      }
    },
    Volume: {
      icon: '🧪',
      units: {
        Liter: 1, Milliliter: 1000, 'Cubic Meter': 0.001, Gallon: 0.264172,
        Quart: 1.05669, Pint: 2.11338, Cup: 4.22675, 'Fluid Oz': 33.814,
        Tablespoon: 67.628, Teaspoon: 202.884
      }
    },
    Time: {
      icon: '⏱️',
      units: {
        Second: 1, Minute: 1/60, Hour: 1/3600, Day: 1/86400,
        Week: 1/604800, Month: 1/2592000, Year: 1/31536000, Millisecond: 1000
      }
    },
    Energy: {
      icon: '⚡',
      units: {
        Joule: 1, Kilojoule: 0.001, Calorie: 0.239006, Kilocalorie: 0.000239006,
        'kWh': 2.77778e-7, 'BTU': 0.000947817, 'eV': 6.242e18
      }
    }
  };

  let currentCategory = 'Length';

  function init() {
    renderCategoryTabs();
    renderConverterUI(currentCategory);
  }

  function renderCategoryTabs() {
    const el = document.getElementById('unit-tabs');
    if (!el) return;
    el.innerHTML = Object.entries(categories).map(([name, data]) => `
      <button class="unit-tab-btn ${name === currentCategory ? 'active' : ''}" 
              onclick="UnitConverter.switchCategory('${name}')">
        ${data.icon} ${name}
      </button>`).join('');
  }

  function switchCategory(name) {
    currentCategory = name;
    renderCategoryTabs();
    renderConverterUI(name);
  }

  function renderConverterUI(cat) {
    const el = document.getElementById('unit-converter-body');
    if (!el) return;
    const catData = categories[cat];
    const unitNames = Object.keys(catData.units);

    if (catData.special && cat === 'Temperature') {
      el.innerHTML = `
        <div class="unit-convert-row">
          <div class="unit-col">
            <label>From</label>
            <select id="unit-from" onchange="UnitConverter.convert()" class="unit-select">
              ${unitNames.map(u => `<option value="${u}">${u}</option>`).join('')}
            </select>
            <input type="number" id="unit-val-from" class="unit-input" placeholder="Enter value" oninput="UnitConverter.convert()" />
          </div>
          <button class="unit-swap-btn" onclick="UnitConverter.swap()">⇄</button>
          <div class="unit-col">
            <label>To</label>
            <select id="unit-to" onchange="UnitConverter.convert()" class="unit-select">
              ${unitNames.map((u, i) => `<option value="${u}" ${i===1?'selected':''}>${u}</option>`).join('')}
            </select>
            <input type="number" id="unit-val-to" class="unit-input" placeholder="Result" readonly />
          </div>
        </div>
        <div class="unit-formula" id="unit-formula"></div>`;
    } else {
      el.innerHTML = `
        <div class="unit-convert-row">
          <div class="unit-col">
            <label>From</label>
            <select id="unit-from" onchange="UnitConverter.convert()" class="unit-select">
              ${unitNames.map(u => `<option value="${u}">${u}</option>`).join('')}
            </select>
            <input type="number" id="unit-val-from" class="unit-input" placeholder="Enter value" oninput="UnitConverter.convert()" />
          </div>
          <button class="unit-swap-btn" onclick="UnitConverter.swap()">⇄</button>
          <div class="unit-col">
            <label>To</label>
            <select id="unit-to" onchange="UnitConverter.convert()" class="unit-select">
              ${unitNames.map((u, i) => `<option value="${u}" ${i===1?'selected':''}>${u}</option>`).join('')}
            </select>
            <input type="number" id="unit-val-to" class="unit-input" placeholder="Result" readonly />
          </div>
        </div>
        <div class="quick-convert-grid" id="quick-grid"></div>`;
    }
    convert();
  }

  function convertTemp(val, from, to) {
    let celsius;
    switch(from) {
      case 'Celsius': celsius = val; break;
      case 'Fahrenheit': celsius = (val - 32) * 5/9; break;
      case 'Kelvin': celsius = val - 273.15; break;
    }
    switch(to) {
      case 'Celsius': return celsius;
      case 'Fahrenheit': return celsius * 9/5 + 32;
      case 'Kelvin': return celsius + 273.15;
    }
  }

  function convert() {
    const from = document.getElementById('unit-from')?.value;
    const to = document.getElementById('unit-to')?.value;
    const valEl = document.getElementById('unit-val-from');
    const resEl = document.getElementById('unit-val-to');
    if (!from || !to || !valEl || !resEl) return;
    const val = parseFloat(valEl.value);
    if (isNaN(val)) { resEl.value = ''; return; }

    const catData = categories[currentCategory];
    let result;

    if (catData.special) {
      result = convertTemp(val, from, to);
      const fEl = document.getElementById('unit-formula');
      if (fEl) fEl.textContent = getFormula(from, to);
    } else {
      const fromFactor = catData.units[from];
      const toFactor = catData.units[to];
      result = val / fromFactor * toFactor;
      renderQuickGrid(val, catData);
    }

    resEl.value = formatResult(result);
  }

  function getFormula(from, to) {
    const formulas = {
      'Celsius-Fahrenheit': '°F = °C × 9/5 + 32',
      'Fahrenheit-Celsius': '°C = (°F − 32) × 5/9',
      'Celsius-Kelvin': 'K = °C + 273.15',
      'Kelvin-Celsius': '°C = K − 273.15',
      'Fahrenheit-Kelvin': 'K = (°F − 32) × 5/9 + 273.15',
      'Kelvin-Fahrenheit': '°F = (K − 273.15) × 9/5 + 32',
    };
    return formulas[`${from}-${to}`] || '';
  }

  function renderQuickGrid(val, catData) {
    const grid = document.getElementById('quick-grid');
    if (!grid) return;
    const fromUnit = document.getElementById('unit-from')?.value;
    const fromFactor = catData.units[fromUnit];
    const baseVal = val / fromFactor;
    grid.innerHTML = `<div class="quick-grid-title">All conversions for ${val} ${fromUnit}</div>` +
      Object.entries(catData.units).map(([unit, factor]) => `
        <div class="quick-grid-item">
          <span class="qg-val">${formatResult(baseVal * factor)}</span>
          <span class="qg-unit">${unit}</span>
        </div>`).join('');
  }

  function formatResult(n) {
    if (isNaN(n)) return '';
    if (Math.abs(n) >= 1e12 || (Math.abs(n) < 1e-6 && n !== 0)) return n.toExponential(6);
    return parseFloat(n.toPrecision(10)).toString();
  }

  function swap() {
    const f = document.getElementById('unit-from');
    const t = document.getElementById('unit-to');
    const vf = document.getElementById('unit-val-from');
    const vt = document.getElementById('unit-val-to');
    if (!f || !t) return;
    [f.value, t.value] = [t.value, f.value];
    vf.value = vt.value;
    convert();
  }

  return { init, switchCategory, convert, swap };
})();
