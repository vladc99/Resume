<template>
  <div class="wordle-page">
    <div class="wordle-card">
      <h1 class="title">Prog-Wordle</h1>

      <div class="board">
        <div v-for="(row, rIdx) in rows" :key="rIdx" class="row">
          <div
            v-for="(cell, cIdx) in row"
            :key="cIdx"
            class="cell"
            :class="cell.state"
          >
            {{ cell.letter }}
          </div>
        </div>
      </div>

      <div class="keyboard">
        <div class="kb-row">
          <button v-for="k in keysRow1" :key="k" class="key" :class="keyState[k]" @click="pressKey(k)">{{ k }}</button>
        </div>
        <div class="kb-row">
          <button v-for="k in keysRow2" :key="k" class="key" :class="keyState[k]" @click="pressKey(k)">{{ k }}</button>
        </div>
        <div class="kb-row">
          <button class="key wide" @click="submitGuess">Enter</button>
          <button v-for="k in keysRow3" :key="k" class="key" :class="keyState[k]" @click="pressKey(k)">{{ k }}</button>
          <button class="key wide" @click="backspace">Del</button>
        </div>
      </div>

      <div class="status" v-if="message">
        <p :class="{ win: gameWon, lose: gameLost }">{{ message }}</p>
        <button v-if="gameWon || gameLost" class="reset" @click="resetGame">Play Again</button>
      </div>
    </div>
  </div>
</template>

<script>
const WORDS = [
  // five-letter programming words/terms
  "array","class","const","queue","stack","scope","regex","types","logic","macro",
  "token","bytes","patch","cache","input","debug","delta","float","tuple","guard",
  "mouse","click","draws","linux","shell","swift","scala","macro","bytes","hooks",
  "async","await","yield","trait","error","throw","catch","raise","print","clone",
  "merge","field","value","index","event","state","route","guard","proxy","scope",
  "npmjs","union","infer","super","import","yield","break","while","times","param"
].filter(w => w.length === 5);

function chooseTarget() {
  const idx = Math.floor(Math.random() * WORDS.length);
  return WORDS[idx].toUpperCase();
}

export default {
  name: "Wordle-Page",
  data() {
    return {
      rows: Array.from({ length: 6 }, () => Array.from({ length: 5 }, () => ({ letter: "", state: "" }))),
      currentRow: 0,
      currentCol: 0,
      target: chooseTarget(),
      message: "",
      gameWon: false,
      gameLost: false,
      keyState: {}, // letter -> 'correct' | 'present' | 'absent'
      keysRow1: ["Q","W","E","R","T","Y","U","I","O","P"],
      keysRow2: ["A","S","D","F","G","H","J","K","L"],
      keysRow3: ["Z","X","C","V","B","N","M"],
    };
  },
  mounted() {
    window.addEventListener('keydown', this.onKey);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.onKey);
  },
  methods: {
    resetGame() {
      this.rows = Array.from({ length: 6 }, () => Array.from({ length: 5 }, () => ({ letter: "", state: "" })));
      this.currentRow = 0;
      this.currentCol = 0;
      this.target = chooseTarget();
      this.message = "";
      this.gameWon = false;
      this.gameLost = false;
      this.keyState = {};
    },
    onKey(e) {
      if (this.gameWon || this.gameLost) return;
      const k = e.key.toUpperCase();
      if (/^[A-Z]$/.test(k) && k.length === 1) return this.pressKey(k);
      if (e.key === 'Backspace') return this.backspace();
      if (e.key === 'Enter') return this.submitGuess();
    },
    pressKey(k) {
      if (this.gameWon || this.gameLost) return;
      if (this.currentCol >= 5) return;
      this.rows[this.currentRow][this.currentCol].letter = k;
      this.currentCol += 1;
    },
    backspace() {
      if (this.gameWon || this.gameLost) return;
      if (this.currentCol === 0) return;
      this.currentCol -= 1;
      this.rows[this.currentRow][this.currentCol].letter = "";
    },
    submitGuess() {
      if (this.gameWon || this.gameLost) return;
      if (this.currentCol < 5) return; // incomplete
      const guess = this.rows[this.currentRow].map(c => c.letter).join("");
      if (!WORDS.includes(guess.toLowerCase())) {
        this.flashMessage("Not in word list");
        return;
      }
      this.scoreGuess(guess);
    },
    scoreGuess(guess) {
      const target = this.target;
      const resultStates = Array(5).fill("absent");
      const targetCounts = {};
      for (let i = 0; i < 5; i++) {
        const t = target[i];
        targetCounts[t] = (targetCounts[t] || 0) + 1;
      }
      // First pass: correct positions
      for (let i = 0; i < 5; i++) {
        if (guess[i] === target[i]) {
          resultStates[i] = "correct";
          targetCounts[guess[i]] -= 1;
        }
      }
      // Second pass: present letters
      for (let i = 0; i < 5; i++) {
        if (resultStates[i] === "correct") continue;
        const g = guess[i];
        if (targetCounts[g] > 0) {
          resultStates[i] = "present";
          targetCounts[g] -= 1;
        }
      }
      // Apply to board and keyboard
      for (let i = 0; i < 5; i++) {
        this.rows[this.currentRow][i].state = resultStates[i];
        const letter = guess[i];
        const existing = this.keyState[letter];
        const priority = { absent: 0, present: 1, correct: 2 };
        if (!existing || priority[resultStates[i]] > priority[existing]) {
          this.keyState[letter] = resultStates[i];
        }
      }

      if (guess === target) {
        this.gameWon = true;
        this.message = `You got it! (${target})`;
        return;
      }

      if (this.currentRow === 5) {
        this.gameLost = true;
        this.message = `Out of tries! It was ${target}`;
        return;
      }

      this.currentRow += 1;
      this.currentCol = 0;
    },
    flashMessage(text) {
      this.message = text;
      setTimeout(() => {
        if (!this.gameWon && !this.gameLost && this.message === text) this.message = "";
      }, 1200);
    },
  }
};
</script>

<style scoped>
.wordle-page {
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 0;
  padding-top: 10vh;
}

.wordle-card {
  background: rgba(255,255,255,0.06);
  border: 1px solid var(--blue-400);
  border-radius: 12px;
  padding: 1.25rem 1.5rem 1rem;
  max-width: 520px;
  width: 100%;
  box-shadow: 0 8px 32px rgba(0,0,0,0.35);
}

.title {
  text-align: center;
  margin: 0 0 1rem 0;
  font-family: "Cinzel", serif;
}

.board {
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  gap: 8px;
}

.row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
}

.cell {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--blue-400);
  background: var(--blue-500);
  color: var(--text-color);
  font-weight: bold;
  font-size: 1.4rem;
  text-transform: uppercase;
  border-radius: 8px;
}

.cell.correct { background: #22c55e; border-color: #16a34a; }
.cell.present { background: #eab308; border-color: #ca8a04; }
.cell.absent { background: #334155; border-color: #334155; opacity: 0.9; }

.keyboard { margin-top: 1rem; }
.kb-row { display: flex; justify-content: center; gap: 6px; margin-bottom: 6px; }
.key {
  padding: 10px 12px;
  min-width: 36px;
  border: 2px solid var(--blue-400);
  background: var(--blue-500);
  color: var(--text-color);
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}
.key.wide { min-width: 64px; }
.key.correct { background: #22c55e; border-color: #16a34a; }
.key.present { background: #eab308; border-color: #ca8a04; }
.key.absent { background: #334155; border-color: #334155; }

.status { text-align: center; margin-top: 10px; }
.status p { margin: 0 0 8px 0; font-weight: 700; }
.status p.win { color: #22c55e; }
.status p.lose { color: #f43f5e; }
.reset {
  padding: 8px 14px;
  border-radius: 8px;
  border: 2px solid var(--blue-400);
  background: var(--blue-500);
  color: var(--text-color);
  cursor: pointer;
}

/* Mobile optimizations */
@media (max-width: 600px) {
  .wordle-page {
    min-height: 100dvh;
    padding: 12px;
    padding-top: 6px;
  }
  .wordle-card {
    max-width: 100%;
    padding: 12px;
    border-radius: 10px;
  }
  .title {
    font-size: 1.25rem;
    margin-bottom: 8px;
  }
  .board { gap: 6px; }
  .row { gap: 6px; }
  .cell {
    height: 44px;
    font-size: 1.1rem;
    border-radius: 6px;
  }
  .keyboard { margin-top: 10px; }
  .kb-row { gap: 4px; margin-bottom: 4px; }
  .key {
    padding: 12px 8px;
    min-width: 34px;
    border-radius: 6px;
    font-size: 0.95rem;
  }
  .key.wide { min-width: 56px; }
}

/* Short screens (e.g., landscape phones) */
@media (max-height: 700px) {
  .cell { height: 40px; font-size: 1rem; }
  .key { padding: 8px 6px; }
}
</style>

