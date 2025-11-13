<template>
  <div ref="canvasContainer"></div>
</template>

<script>
import p5 from "p5";

export default {
  name: "SandpileBackground",
  data() {
    return {
      grid: [],
      cols: 0,
      rows: 0,
      resolution: 8,
      maxSand: 4,
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
        
        // Initialize with zeros
        for (let i = 0; i < this.cols; i++) {
          for (let j = 0; j < this.rows; j++) {
            this.grid[i][j] = 0;
          }
        }
        
        // Add sand to the center
        let centerX = p.floor(this.cols / 2);
        let centerY = p.floor(this.rows / 2);
        this.grid[centerX][centerY] = 1000;
        
        p.frameRate(30);
      };

      p.draw = () => {
        p.background(255);

        // Topple any cells with 4 or more grains
        let nextGrid = this.make2DArray(this.cols, this.rows);
        
        // Copy current grid
        for (let i = 0; i < this.cols; i++) {
          for (let j = 0; j < this.rows; j++) {
            nextGrid[i][j] = this.grid[i][j];
          }
        }

        // Topple cells
        for (let i = 0; i < this.cols; i++) {
          for (let j = 0; j < this.rows; j++) {
            if (this.grid[i][j] >= this.maxSand) {
              nextGrid[i][j] -= this.maxSand;
              
              // Give to neighbors
              if (i > 0) nextGrid[i - 1][j]++;
              if (i < this.cols - 1) nextGrid[i + 1][j]++;
              if (j > 0) nextGrid[i][j - 1]++;
              if (j < this.rows - 1) nextGrid[i][j + 1]++;
            }
          }
        }

        this.grid = nextGrid;

        // Draw the grid
        for (let i = 0; i < this.cols; i++) {
          for (let j = 0; j < this.rows; j++) {
            let x = i * this.resolution;
            let y = j * this.resolution;
            let sand = this.grid[i][j];
            
            // Color based on sand count
            if (sand === 0) {
              p.fill(255, 240, 200);
            } else if (sand === 1) {
              p.fill(100, 150, 255);
            } else if (sand === 2) {
              p.fill(255, 100, 100);
            } else if (sand === 3) {
              p.fill(100, 255, 100);
            } else {
              p.fill(255, 255, 0);
            }
            
            p.noStroke();
            p.rect(x, y, this.resolution, this.resolution);
          }
        }

        // Periodically add more sand to the center
        if (p.frameCount % 10 === 0) {
          let centerX = p.floor(this.cols / 2);
          let centerY = p.floor(this.rows / 2);
          this.grid[centerX][centerY] += 200;
        }
      };
    },
    make2DArray(cols, rows) {
      let arr = new Array(cols);
      for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
      }
      return arr;
    },
  },
};
</script>

<style scoped>
.div {
  border: 1px solid black;
}
</style>
