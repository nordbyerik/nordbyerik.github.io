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
      cols: 0,
      rows: 0,
      resolution: 10,
    };
  },
  mounted() {
    this.sketch = new p5(this.sketch, this.$refs.canvasContainer);
  },
  methods: {
    sketch(p) {
      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);
        this.cols = p.floor(p.width / this.resolution);
        this.rows = p.floor(p.height / this.resolution);

        this.grid = this.make2DArray(this.cols, this.rows);
        for (let i = 0; i < this.cols; i++) {
          for (let j = 0; j < this.rows; j++) {
            this.grid[i][j] = p.floor(p.random(2));
          }
        }
      };

      p.draw = () => {
        p.background(255);

        for (let i = 0; i < this.cols; i++) {
          for (let j = 0; j < this.rows; j++) {
            let x = i * this.resolution;
            let y = j * this.resolution;
            if (this.grid[i][j] == 1) {
              p.fill(0);
              p.stroke(0);
              p.rect(x, y, this.resolution - 1, this.resolution - 1);
            }
          }
        }

        let next = this.make2DArray(this.cols, this.rows);

        // Compute next based on grid
        for (let i = 0; i < this.cols; i++) {
          for (let j = 0; j < this.rows; j++) {
            let state = this.grid[i][j];
            // Count live neighbors
            let neighbors = this.countNeighbors(this.grid, i, j);

            if (state == 0 && neighbors == 3) {
              next[i][j] = 1;
            } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
              next[i][j] = 0;
            } else {
              next[i][j] = state;
            }
          }
        }

        this.grid = next;
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
