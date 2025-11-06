<template>
  <div ref="canvasContainer"></div>
</template>

<script>
import p5 from "p5";

export default {
  name: "RockPaperScissorsBackground",
  data() {
    return {
      grid: [],
      cols: 0,
      rows: 0,
      resolution: 6,
    };
  },
  mounted() {
    this.sketch = new p5(this.sketch, this.$refs.canvasContainer);
  },
  methods: {
    sketch(p) {
      // 0 = Rock (gray), 1 = Paper (green), 2 = Scissors (red)
      const colors = [
        [120, 120, 120], // Rock - Gray
        [50, 200, 100],  // Paper - Green
        [255, 80, 80],   // Scissors - Red
      ];

      // Who beats whom: beats[attacker][defender] = true if attacker wins
      const beats = [
        [false, false, true],  // Rock beats Scissors
        [true, false, false],  // Paper beats Rock
        [false, true, false],  // Scissors beats Paper
      ];

      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);
        p.frameRate(15); // Moderate speed to watch spirals form

        this.cols = p.floor(p.width / this.resolution);
        this.rows = p.floor(p.height / this.resolution);

        // Initialize with random strategies
        this.grid = [];
        for (let i = 0; i < this.cols; i++) {
          this.grid[i] = [];
          for (let j = 0; j < this.rows; j++) {
            this.grid[i][j] = p.floor(p.random(3));
          }
        }
      };

      p.draw = () => {
        const newGrid = [];
        for (let i = 0; i < this.cols; i++) {
          newGrid[i] = [];
          for (let j = 0; j < this.rows; j++) {
            newGrid[i][j] = this.grid[i][j];
          }
        }

        // Update each cell based on neighbors
        for (let i = 0; i < this.cols; i++) {
          for (let j = 0; j < this.rows; j++) {
            const current = this.grid[i][j];

            // Check all 4 neighbors (von Neumann neighborhood for cleaner spirals)
            const neighbors = [
              { x: (i - 1 + this.cols) % this.cols, y: j },
              { x: (i + 1) % this.cols, y: j },
              { x: i, y: (j - 1 + this.rows) % this.rows },
              { x: i, y: (j + 1) % this.rows },
            ];

            // If any neighbor beats current strategy, adopt it
            for (let n of neighbors) {
              const neighborStrategy = this.grid[n.x][n.y];
              if (beats[neighborStrategy][current]) {
                // Adopt neighbor's winning strategy with some probability
                if (p.random() < 0.3) {
                  newGrid[i][j] = neighborStrategy;
                  break;
                }
              }
            }
          }
        }

        this.grid = newGrid;

        // Render
        p.noStroke();
        for (let i = 0; i < this.cols; i++) {
          for (let j = 0; j < this.rows; j++) {
            const strategy = this.grid[i][j];
            p.fill(colors[strategy][0], colors[strategy][1], colors[strategy][2]);
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
