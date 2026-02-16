<template>
  <div class="minesweeper-page" :class="{ 'hard-difficulty': currentDifficulty === 'hard', 'medium-difficulty': currentDifficulty === 'medium' }">
    <div class="minesweeper-card" :class="{ 'hard-difficulty': currentDifficulty === 'hard' }">
      <h1 class="title">Minesweeper</h1>

      <div class="game-controls">
        <div class="control-item">
          <span class="label">Mines:</span>
          <span class="value">{{ minesRemaining }}</span>
        </div>
        <button class="reset-btn" @click="resetGame">
          <i class="pi" :class="gameStatus === 'won' ? 'pi-check' : gameStatus === 'lost' ? 'pi-times' : 'pi-refresh'"></i>
        </button>
        <div class="control-item">
          <span class="label">Time:</span>
          <span class="value">{{ formattedTime }}</span>
        </div>
      </div>

      <div class="board-container">
        <div class="board" :style="{ gridTemplateColumns: `repeat(${cols}, 1fr)` }">
          <div
            v-for="(cell, index) in cells"
            :key="index"
            class="cell"
            :class="{
              'revealed': cell.revealed,
              'flagged': cell.flagged,
              'mine': cell.revealed && cell.isMine,
              'exploded': cell.exploded,
              [`adjacent-${cell.adjacentMines}`]: cell.revealed && !cell.isMine && cell.adjacentMines > 0
            }"
            @click="handleCellClick(index)"
            @contextmenu.prevent="handleRightClick(index)"
          >
            <span v-if="cell.revealed && !cell.isMine && cell.adjacentMines > 0" class="number">
              {{ cell.adjacentMines }}
            </span>
            <i v-if="cell.flagged" class="pi pi-flag-fill flag-icon"></i>
            <i v-if="cell.revealed && cell.isMine" class="pi pi-times mine-icon"></i>
          </div>
        </div>
      </div>

      <div class="difficulty-selector">
        <button
          v-for="diff in difficulties"
          :key="diff.name"
          class="diff-btn"
          :class="{ active: currentDifficulty === diff.name }"
          @click="setDifficulty(diff)"
        >
          {{ diff.name }}
        </button>
      </div>

      <div class="status" v-if="gameStatus === 'won' || gameStatus === 'lost'">
        <p :class="{ win: gameStatus === 'won', lose: gameStatus === 'lost' }">
          {{ gameStatus === 'won' ? 'Congratulations! You won!' : 'Game Over! Try again.' }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
const DIFFICULTIES = {
  easy: { rows: 9, cols: 9, mines: 10 },
  medium: { rows: 16, cols: 16, mines: 40 },
  hard: { rows: 16, cols: 30, mines: 99 }
};

export default {
  name: "Minesweeper-Page",
  data() {
    return {
      rows: 9,
      cols: 9,
      mines: 10,
      cells: [],
      gameStatus: 'playing', // 'playing', 'won', 'lost'
      firstClick: true,
      timer: 0,
      timerInterval: null,
      currentDifficulty: 'easy',
      difficulties: [
        { name: 'Easy', ...DIFFICULTIES.easy },
        { name: 'Medium', ...DIFFICULTIES.medium },
        { name: 'Hard', ...DIFFICULTIES.hard }
      ]
    };
  },
  computed: {
    minesRemaining() {
      const flaggedCount = this.cells.filter(c => c.flagged).length;
      return Math.max(0, this.mines - flaggedCount);
    },
    formattedTime() {
      const minutes = Math.floor(this.timer / 60);
      const seconds = this.timer % 60;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  },
  mounted() {
    this.resetGame();
  },
  beforeUnmount() {
    this.stopTimer();
  },
  methods: {
    resetGame() {
      this.stopTimer();
      this.gameStatus = 'playing';
      this.firstClick = true;
      this.timer = 0;
      this.cells = Array(this.rows * this.cols).fill(null).map(() => ({
        isMine: false,
        revealed: false,
        flagged: false,
        adjacentMines: 0,
        exploded: false
      }));
    },
    setDifficulty(diff) {
      this.currentDifficulty = diff.name.toLowerCase();
      this.rows = diff.rows;
      this.cols = diff.cols;
      this.mines = diff.mines;
      this.resetGame();
    },
    startTimer() {
      if (this.timerInterval) return;
      this.timerInterval = setInterval(() => {
        this.timer++;
      }, 1000);
    },
    stopTimer() {
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
      }
    },
    placeMines(excludeIndex) {
      let placed = 0;
      while (placed < this.mines) {
        const index = Math.floor(Math.random() * this.cells.length);
        if (index !== excludeIndex && !this.cells[index].isMine) {
          this.cells[index].isMine = true;
          placed++;
        }
      }
      this.calculateAdjacentMines();
    },
    calculateAdjacentMines() {
      for (let i = 0; i < this.cells.length; i++) {
        if (this.cells[i].isMine) continue;
        let count = 0;
        const neighbors = this.getNeighbors(i);
        neighbors.forEach(nIdx => {
          if (this.cells[nIdx].isMine) count++;
        });
        this.cells[i].adjacentMines = count;
      }
    },
    getNeighbors(index) {
      const row = Math.floor(index / this.cols);
      const col = index % this.cols;
      const neighbors = [];
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = row + dr;
          const nc = col + dc;
          if (nr >= 0 && nr < this.rows && nc >= 0 && nc < this.cols) {
            neighbors.push(nr * this.cols + nc);
          }
        }
      }
      return neighbors;
    },
    handleCellClick(index) {
      if (this.gameStatus !== 'playing') return;
      const cell = this.cells[index];
      if (cell.flagged || cell.revealed) return;

      if (this.firstClick) {
        this.placeMines(index);
        this.firstClick = false;
        this.startTimer();
      }

      if (cell.isMine) {
        cell.exploded = true;
        this.revealAllMines();
        this.gameStatus = 'lost';
        this.stopTimer();
        return;
      }

      this.revealCell(index);
      this.checkWin();
    },
    revealCell(index) {
      const cell = this.cells[index];
      if (cell.revealed || cell.flagged) return;
      
      cell.revealed = true;

      if (cell.adjacentMines === 0) {
        const neighbors = this.getNeighbors(index);
        neighbors.forEach(nIdx => {
          if (!this.cells[nIdx].revealed && !this.cells[nIdx].flagged) {
            this.revealCell(nIdx);
          }
        });
      }
    },
    handleRightClick(index) {
      if (this.gameStatus !== 'playing') return;
      const cell = this.cells[index];
      if (cell.revealed) return;
      cell.flagged = !cell.flagged;
      this.checkWin();
    },
    revealAllMines() {
      this.cells.forEach(cell => {
        if (cell.isMine && !cell.flagged) {
          cell.revealed = true;
        }
      });
    },
    checkWin() {
      const allNonMinesRevealed = this.cells.every(cell => 
        cell.isMine || cell.revealed
      );
      if (allNonMinesRevealed) {
        this.gameStatus = 'won';
        this.stopTimer();
      }
    }
  }
};
</script>

<style scoped>
.minesweeper-page {
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 2rem 1rem;
  padding-top: 5vh;
  padding-bottom: 10vh;
}

.minesweeper-page.medium-difficulty {
  padding-top: 3vh;
  padding-bottom: 12vh;
}

.minesweeper-page.hard-difficulty {
  padding-top: 4vh;
  padding-bottom: 12vh;
}

.minesweeper-card {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--blue-400);
  border-radius: 12px;
  padding: 1.5rem;
  max-width: 800px;
  width: 100%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
}

.minesweeper-card.hard-difficulty {
  max-width: 1200px;
}

.title {
  text-align: center;
  margin: 0 0 1.5rem 0;
  font-family: "Cinzel", serif;
  font-size: 2rem;
}

.game-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 0.75rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
}

.control-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
}

.label {
  color: var(--text-color-secondary);
}

.value {
  color: var(--text-color);
  font-size: 1.1rem;
  min-width: 60px;
  text-align: center;
}

.reset-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid var(--blue-400);
  background: var(--blue-500);
  color: var(--text-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.2s;
}

.reset-btn:hover {
  background: var(--blue-400);
  transform: scale(1.1);
}

.board-container {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
  overflow-x: auto;
  width: 100%;
}

.hard-difficulty .board-container {
  padding: 0 0.5rem;
}

.board {
  display: grid;
  gap: 2px;
  background: rgba(0, 0, 0, 0.3);
  padding: 2px;
  border-radius: 4px;
}

.cell {
  width: 32px;
  height: 32px;
  background: var(--blue-500);
  border: 2px solid var(--blue-400);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  transition: all 0.1s;
  font-weight: bold;
  font-size: 0.9rem;
  position: relative;
}

/* Smaller cells for hard difficulty to fit better */
.hard-difficulty .cell {
  width: 28px;
  height: 28px;
  font-size: 0.8rem;
}

.cell:hover:not(.revealed):not(.flagged) {
  background: var(--blue-400);
  transform: scale(1.05);
}

.cell.revealed {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  cursor: default;
}

.cell.flagged {
  background: var(--blue-600);
}

.cell.mine {
  background: #dc2626;
}

.cell.exploded {
  background: #991b1b;
  animation: explode 0.3s;
}

@keyframes explode {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

.flag-icon {
  color: #f43f5e;
  font-size: 1rem;
}

.mine-icon {
  color: #000;
  font-size: 1rem;
}

.number {
  color: var(--text-color);
}

.cell.adjacent-1 .number { color: #3b82f6; }
.cell.adjacent-2 .number { color: #22c55e; }
.cell.adjacent-3 .number { color: #f59e0b; }
.cell.adjacent-4 .number { color: #ef4444; }
.cell.adjacent-5 .number { color: #a855f7; }
.cell.adjacent-6 .number { color: #ec4899; }
.cell.adjacent-7 .number { color: #14b8a6; }
.cell.adjacent-8 .number { color: #f97316; }

.difficulty-selector {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.diff-btn {
  padding: 0.5rem 1rem;
  border: 2px solid var(--blue-400);
  background: var(--blue-500);
  color: var(--text-color);
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.diff-btn:hover {
  background: var(--blue-400);
}

.diff-btn.active {
  background: var(--blue-300);
  border-color: var(--blue-300);
  color: #000;
}

.status {
  text-align: center;
  margin-top: 1rem;
}

.status p {
  margin: 0;
  font-weight: 700;
  font-size: 1.1rem;
}

.status p.win {
  color: #22c55e;
}

.status p.lose {
  color: #f43f5e;
}

/* Mobile optimizations */
@media (max-width: 600px) {
  .minesweeper-page {
    padding: 1rem 0.5rem;
    padding-top: 4vh;
    padding-bottom: 10vh;
  }

  .minesweeper-page.medium-difficulty {
    padding-top: 2vh;
    padding-bottom: 12vh;
  }

  .minesweeper-page.hard-difficulty {
    padding-top: 3vh;
    padding-bottom: 12vh;
  }

  .minesweeper-card {
    padding: 1rem;
  }

  .title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .game-controls {
    padding: 0.5rem;
    margin-bottom: 1rem;
  }

  .control-item {
    font-size: 0.9rem;
  }

  .value {
    font-size: 1rem;
    min-width: 50px;
  }

  .reset-btn {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }

  .cell {
    width: 28px;
    height: 28px;
    font-size: 0.8rem;
  }

  .diff-btn {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
}

/* Adjust for hard difficulty on smaller screens */
@media (max-width: 600px) {
  .board {
    max-width: 100%;
  }
  
  .cell {
    width: 24px;
    height: 24px;
    font-size: 0.75rem;
  }

  .hard-difficulty .cell {
    width: 20px;
    height: 20px;
    font-size: 0.7rem;
  }

  .minesweeper-card.hard-difficulty {
    max-width: 100%;
    padding: 1rem 0.5rem;
  }
}

/* Medium screens - adjust hard difficulty */
@media (min-width: 601px) and (max-width: 1024px) {
  .minesweeper-card.hard-difficulty {
    max-width: 1000px;
  }

  .hard-difficulty .cell {
    width: 26px;
    height: 26px;
  }
}
</style>
