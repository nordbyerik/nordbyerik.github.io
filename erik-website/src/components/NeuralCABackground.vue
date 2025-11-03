<template>
  <div ref="canvasContainer"></div>
</template>

<script>
import p5 from "p5";

export default {
  name: "NeuralCABackground",
  data() {
    return {
      grid: [],
      cols: 0,
      rows: 0,
      resolution: 4,
      weights: [],
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

        // Initialize random "learned" weights for neural CA
        this.weights = [];
        for (let i = 0; i < 9; i++) {
          this.weights.push(p.random(-1, 1));
        }

        this.grid = this.make2DArray(this.cols, this.rows);
        
        // Initialize with random values
        for (let i = 0; i < this.cols; i++) {
          for (let j = 0; j < this.rows; j++) {
            this.grid[i][j] = p.random() > 0.9 ? 1 : 0;
          }
        }
        
        // Add some initial pattern in the center
        let centerX = p.floor(this.cols / 2);
        let centerY = p.floor(this.rows / 2);
        for (let i = -5; i <= 5; i++) {
          for (let j = -5; j <= 5; j++) {
            if (i * i + j * j < 25) {
              this.grid[centerX + i][centerY + j] = 1;
            }
          }
        }
        
        p.frameRate(20);
      };

      p.draw = () => {
        p.background(20);

        let next = this.make2DArray(this.cols, this.rows);

        // Apply neural CA rules
        for (let i = 1; i < this.cols - 1; i++) {
          for (let j = 1; j < this.rows - 1; j++) {
            // Get 3x3 neighborhood
            let neighborhood = [];
            for (let di = -1; di <= 1; di++) {
              for (let dj = -1; dj <= 1; dj++) {
                neighborhood.push(this.grid[i + di][j + dj]);
              }
            }
            
            // Compute weighted sum (simplified neural network)
            let sum = 0;
            for (let k = 0; k < 9; k++) {
              sum += neighborhood[k] * this.weights[k];
            }
            
            // Apply activation function (tanh-like)
            let activation = p.constrain(sum, -1, 1);
            next[i][j] = (activation + 1) / 2; // Normalize to [0, 1]
            
            // Add some growth bias
            if (next[i][j] > 0.5) {
              next[i][j] = p.min(next[i][j] + 0.05, 1);
            }
          }
        }

        this.grid = next;

        // Draw the grid with smooth colors
        for (let i = 0; i < this.cols; i++) {
          for (let j = 0; j < this.rows; j++) {
            let x = i * this.resolution;
            let y = j * this.resolution;
            let value = this.grid[i][j];
            
            // Create colorful gradient based on cell value
            let hue = p.map(value, 0, 1, 200, 320);
            let brightness = p.map(value, 0, 1, 20, 255);
            let saturation = p.map(value, 0, 1, 0, 100);
            
            p.colorMode(p.HSB);
            p.fill(hue, saturation, brightness);
            p.noStroke();
            p.rect(x, y, this.resolution, this.resolution);
          }
        }
        
        p.colorMode(p.RGB);

        // Occasionally add a new seed
        if (p.frameCount % 200 === 0) {
          let randX = p.floor(p.random(10, this.cols - 10));
          let randY = p.floor(p.random(10, this.rows - 10));
          for (let i = -2; i <= 2; i++) {
            for (let j = -2; j <= 2; j++) {
              this.grid[randX + i][randY + j] = 1;
            }
          }
        }
      };
    },
    make2DArray(cols, rows) {
      let arr = new Array(cols);
      for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
        for (let j = 0; j < rows; j++) {
          arr[i][j] = 0;
        }
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
