<template>
  <div ref="canvasContainer"></div>
</template>

<script>
import p5 from "p5";

export default {
  name: "PrisonersDilemmaBackground",
  data() {
    return {
      grid: [],
      scores: [],
      cols: 0,
      rows: 0,
      resolution: 8,
    };
  },
  mounted() {
    this.sketch = new p5(this.sketch, this.$refs.canvasContainer);
  },
  methods: {
    sketch(p) {
      // Payoff matrix for Prisoner's Dilemma
      // [my strategy][opponent strategy] = my payoff
      const payoff = [
        [3, 0], // Cooperate: both cooperate = 3, I cooperate they defect = 0
        [5, 1], // Defect: I defect they cooperate = 5, both defect = 1
      ];

      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);
        p.frameRate(10); // Slow evolution to watch patterns emerge

        this.cols = p.floor(p.width / this.resolution);
        this.rows = p.floor(p.height / this.resolution);

        // Initialize grid with random strategies
        // 0 = Cooperate (blue), 1 = Defect (red)
        this.grid = [];
        this.scores = [];
        for (let i = 0; i < this.cols; i++) {
          this.grid[i] = [];
          this.scores[i] = [];
          for (let j = 0; j < this.rows; j++) {
            this.grid[i][j] = p.random() < 0.5 ? 0 : 1;
            this.scores[i][j] = 0;
          }
        }
      };

      p.draw = () => {
        // Calculate scores by playing with all neighbors
        for (let i = 0; i < this.cols; i++) {
          for (let j = 0; j < this.rows; j++) {
            let totalScore = 0;
            const myStrategy = this.grid[i][j];

            // Play with all 8 neighbors (or 4 for edge cells)
            for (let di = -1; di <= 1; di++) {
              for (let dj = -1; dj <= 1; dj++) {
                if (di === 0 && dj === 0) continue;

                const ni = (i + di + this.cols) % this.cols;
                const nj = (j + dj + this.rows) % this.rows;
                const opponentStrategy = this.grid[ni][nj];

                totalScore += payoff[myStrategy][opponentStrategy];
              }
            }

            this.scores[i][j] = totalScore;
          }
        }

        // Update strategy: adopt best neighbor's strategy
        const newGrid = [];
        for (let i = 0; i < this.cols; i++) {
          newGrid[i] = [];
          for (let j = 0; j < this.rows; j++) {
            let bestScore = this.scores[i][j];
            let bestStrategy = this.grid[i][j];

            // Check all neighbors
            for (let di = -1; di <= 1; di++) {
              for (let dj = -1; dj <= 1; dj++) {
                const ni = (i + di + this.cols) % this.cols;
                const nj = (j + dj + this.rows) % this.rows;

                if (this.scores[ni][nj] > bestScore) {
                  bestScore = this.scores[ni][nj];
                  bestStrategy = this.grid[ni][nj];
                }
              }
            }

            newGrid[i][j] = bestStrategy;
          }
        }

        this.grid = newGrid;

        // Render
        p.noStroke();
        for (let i = 0; i < this.cols; i++) {
          for (let j = 0; j < this.rows; j++) {
            if (this.grid[i][j] === 0) {
              // Cooperate - Blue
              p.fill(50, 100, 255);
            } else {
              // Defect - Red
              p.fill(255, 50, 50);
            }
            p.rect(
              i * this.resolution,
              j * this.resolution,
              this.resolution,
              this.resolution
            );
          }
        }
      };
    },
  },
};
</script>

<style scoped>
div {
  width: 100%;
  height: 100%;
}
</style>
