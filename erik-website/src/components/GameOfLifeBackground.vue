<template>
  <div ref="canvasContainer"></div>
</template>

<script>
import p5 from "p5";

export default {
  name: "GameOfLifeBackground",
  data() {
    return {
      grid: [],
      next: [], // Pre-allocate next grid to avoid creating new arrays each frame
      cols: 0,
      rows: 0,
      resolution: 15, // Increased from 10 to 15 for ~44% fewer cells
    };
  },
  mounted() {
    this.sketch = new p5(this.sketch, this.$refs.canvasContainer);
  },
  methods: {
    sketch(p) {
      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);
        p.frameRate(20); // Game of Life doesn't need 60fps

        this.cols = p.floor(p.width / this.resolution);
        this.rows = p.floor(p.height / this.resolution);

        // Pre-allocate both grids to avoid creating new arrays each frame
        this.grid = this.make2DArray(this.cols, this.rows);
        this.next = this.make2DArray(this.cols, this.rows);

        // Random initialization
        for (let i = 0; i < this.cols; i++) {
          for (let j = 0; j < this.rows; j++) {
            this.grid[i][j] = p.floor(p.random(2));
          }
        }
      };

      p.draw = () => {
        p.background(255);

        // Optimization: Only draw live cells (background is already white)
        p.fill(0);
        p.stroke(0);
        p.noStroke(); // Faster without individual cell borders
        for (let i = 0; i < this.cols; i++) {
          for (let j = 0; j < this.rows; j++) {
            if (this.grid[i][j] == 1) {
              let x = i * this.resolution;
              let y = j * this.resolution;
              p.rect(x, y, this.resolution, this.resolution);
            }
          }
        }

        // Compute next generation using pre-allocated array
        for (let i = 0; i < this.cols; i++) {
          for (let j = 0; j < this.rows; j++) {
            let state = this.grid[i][j];
            let neighbors = this.countNeighbors(this.grid, i, j);

            // Game of Life rules
            if (state == 0 && neighbors == 3) {
              this.next[i][j] = 1;
            } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
              this.next[i][j] = 0;
            } else {
              this.next[i][j] = state;
            }
          }
        }

        // Swap grids (much faster than reassigning)
        let temp = this.grid;
        this.grid = this.next;
        this.next = temp;
      };
    },
    make2DArray(cols, rows) {
      let arr = new Array(cols);
      for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
      }
      return arr;
    },
    countNeighbors(grid, x, y) {
      let sum = 0;
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          let col = (x + i + this.cols) % this.cols;
          let row = (y + j + this.rows) % this.rows;
          sum += grid[col][row];
        }
      }
      sum -= grid[x][y];
      return sum;
    },
  },
};
</script>

<style scoped>
.div {
  border: 1px solid black;
}
</style>
