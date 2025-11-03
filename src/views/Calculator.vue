<template>
  <div class="calc-page">
    <div class="calculator">
      <div class="display" @dblclick="clearAll" title="Double-click to clear">
        <div class="expression">{{ displayExpression }}</div>
        <div class="result">{{ displayResult }}</div>
      </div>
      <div class="keys">
        <button class="key fn" @click="clearAll">AC</button>
        <button class="key fn" @click="deleteLast">DEL</button>
        <button class="key op" @click="pressOp('/')">÷</button>
        <button class="key op" @click="pressOp('*')">×</button>

        <button class="key" @click="pressDigit('7')">7</button>
        <button class="key" @click="pressDigit('8')">8</button>
        <button class="key" @click="pressDigit('9')">9</button>
        <button class="key op" @click="pressOp('-')">−</button>

        <button class="key" @click="pressDigit('4')">4</button>
        <button class="key" @click="pressDigit('5')">5</button>
        <button class="key" @click="pressDigit('6')">6</button>
        <button class="key op" @click="pressOp('+')">+</button>

        <button class="key" @click="pressDigit('1')">1</button>
        <button class="key" @click="pressDigit('2')">2</button>
        <button class="key" @click="pressDigit('3')">3</button>
        <button class="key equals" @click="calculate">=</button>

        <button class="key span-2" @click="pressDigit('0')">0</button>
        <button class="key" @click="pressDecimal">.</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Calculator-Page",
  data() {
    return {
      expression: "",
      result: "0",
      justCalculated: false,
    };
  },
  computed: {
    displayExpression() {
      return this.expression || "0";
    },
    displayResult() {
      return this.result;
    }
  },
  mounted() {
    window.addEventListener('keydown', this.onKeydown);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.onKeydown);
  },
  methods: {
    onKeydown(e) {
      const key = e.key;
      if (/^[0-9]$/.test(key)) return this.pressDigit(key);
      if (["+","-","*","/"].includes(key)) return this.pressOp(key);
      if (key === ".") return this.pressDecimal();
      if (key === "Enter" || key === "=") return this.calculate();
      if (key === "Backspace") return this.deleteLast();
      if (key.toLowerCase() === "c") return this.clearAll();
    },
    clearAll() {
      this.expression = "";
      this.result = "0";
      this.justCalculated = false;
    },
    deleteLast() {
      if (this.justCalculated) {
        this.clearAll();
        return;
      }
      this.expression = this.expression.slice(0, -1);
    },
    pressDigit(d) {
      if (this.justCalculated) {
        this.expression = "";
        this.justCalculated = false;
      }
      // Avoid leading zeros like 00
      if (/(^|[^0-9])0$/.test(this.expression)) {
        this.expression = this.expression.slice(0, -1) + d;
      } else {
        this.expression += d;
      }
    },
    pressOp(op) {
      if (!this.expression) return;
      this.justCalculated = false;
      // Replace trailing operator
      if (/[+\-*/]$/.test(this.expression)) {
        this.expression = this.expression.slice(0, -1) + op;
      } else {
        this.expression += op;
      }
    },
    pressDecimal() {
      if (this.justCalculated) {
        this.expression = "";
        this.justCalculated = false;
      }
      // Disallow multiple decimals within the current number segment
      const parts = this.expression.split(/[+\-*/]/);
      const current = parts[parts.length - 1] || "";
      if (current.includes(".")) return;
      if (!current) {
        this.expression += "0.";
      } else {
        this.expression += ".";
      }
    },
    sanitize(expr) {
      // Only allow digits, operators, dot, spaces
      return /^[0-9+\-*/.\s]+$/.test(expr) ? expr : "0";
    },
    calculate() {
      if (!this.expression) return;
      const safe = this.sanitize(this.expression);
      // Avoid trailing operator
      const cleaned = safe.replace(/[+\-*/.]+$/, "");
      try {
        // eslint-disable-next-line no-new-func
        const value = Function(`"use strict"; return (${cleaned || 0})`)();
        const normalized = Number.isFinite(value) ? value : 0;
        this.result = String(normalized);
        this.expression = String(normalized);
        this.justCalculated = true;
      } catch (e) {
        this.result = "Error";
        this.justCalculated = true;
      }
    }
  }
};
</script>

<style scoped>
.calc-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 0;
  padding-top: 10vh;
}

.calculator {
  width: 100%;
  max-width: 360px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--blue-400);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.35);
  overflow: hidden;
}

.display {
  background: var(--blue-500);
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--blue-400);
}

.expression {
  color: var(--blue-200);
  font-family: 'Courier New', monospace;
  font-size: 1.2rem;
  opacity: 0.85;
  min-height: 1.2em;
  word-wrap: break-word;
}

.result {
  color: var(--blue-300);
  font-family: 'Courier New', monospace;
  font-size: 2.4rem;
  text-align: right;
}

.keys {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  padding: 12px;
  background: rgba(0,0,0,0.1);
}

.key {
  padding: 14px 10px;
  border-radius: 10px;
  border: 2px solid var(--blue-400);
  background: var(--blue-500);
  color: var(--text-color);
  font-size: 1.1rem;
  cursor: pointer;
  transition: transform 0.06s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.key:hover {
  background: var(--blue-100);
}

.key:active {
  transform: translateY(1px);
}

.key.op {
  background: #2f4b55;
}

.key.fn {
  background: #4a3e3e;
}

.key.equals {
  background: var(--blue-400);
  border-color: var(--blue-300);
  color: var(--blue-300);
  grid-row: span 2;
}

.span-2 {
  grid-column: span 2;
}

@media (max-width: 420px) {
  .calculator { max-width: 320px; }
}
</style>

