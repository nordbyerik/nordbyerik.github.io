<template>
  <div ref="canvasContainer"></div>
</template>

<script>
import p5 from "p5";

export default {
  name: "ReactionDiffusionBackground",
  data() {
    return {
      grid: [],
      next: [],
      cols: 0,
      rows: 0,
      resolution: 3,
      dA: 1.0,
      dB: 0.5,
      feed: 0.055,
      kill: 0.062,
    };
  },
  mounted() {
    this.sketch = new p5(this.sketch, this.$refs.canvasContainer);
  },
  methods: {
    sketch(p) {
      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);
        p.pixelDensity(1);
        this.cols = p.floor(p.width / this.resolution);
        this.rows = p.floor(p.height / this.resolution);

        // Initialize grids for chemicals A and B
        this.grid = this.make2DArray(this.cols, this.rows);
        this.next = this.make2DArray(this.cols, this.rows);
        
        // Initialize with A=1, B=0
        for (let i = 0; i < this.cols; i++) {
          for (let j = 0; j < this.rows; j++) {
            this.grid[i][j] = { a: 1, b: 0 };
            this.next[i][j] = { a: 1, b: 0 };
          }
        }
        
        // Seed with B in the center
        let centerX = p.floor(this.cols / 2);
        let centerY = p.floor(this.rows / 2);
        for (let i = -10; i <= 10; i++) {
          for (let j = -10; j <= 10; j++) {
            if (i * i + j * j < 100) {
              this.grid[centerX + i][centerY + j].b = 1;
            }
          }
        }
        
        p.frameRate(30);
      };

      p.draw = () => {
        // Update reaction-diffusion
        for (let x = 1; x < this.cols - 1; x++) {
          for (let y = 1; y < this.rows - 1; y++) {
            let a = this.grid[x][y].a;
            let b = this.grid[x][y].b;
            
            // Calculate Laplacian for A
            let laplaceA = 0;
            laplaceA += this.grid[x][y].a * -1;
            laplaceA += this.grid[x - 1][y].a * 0.2;
            laplaceA += this.grid[x + 1][y].a * 0.2;
            laplaceA += this.grid[x][y - 1].a * 0.2;
            laplaceA += this.grid[x][y + 1].a * 0.2;
            laplaceA += this.grid[x - 1][y - 1].a * 0.05;
            laplaceA += this.grid[x + 1][y - 1].a * 0.05;
            laplaceA += this.grid[x - 1][y + 1].a * 0.05;
            laplaceA += this.grid[x + 1][y + 1].a * 0.05;
            
            // Calculate Laplacian for B
            let laplaceB = 0;
            laplaceB += this.grid[x][y].b * -1;
            laplaceB += this.grid[x - 1][y].b * 0.2;
            laplaceB += this.grid[x + 1][y].b * 0.2;
            laplaceB += this.grid[x][y - 1].b * 0.2;
            laplaceB += this.grid[x][y + 1].b * 0.2;
            laplaceB += this.grid[x - 1][y - 1].b * 0.05;
            laplaceB += this.grid[x + 1][y - 1].b * 0.05;
            laplaceB += this.grid[x - 1][y + 1].b * 0.05;
            laplaceB += this.grid[x + 1][y + 1].b * 0.05;
            
            // Gray-Scott reaction-diffusion equations
            let abb = a * b * b;
            this.next[x][y].a = a + (this.dA * laplaceA - abb + this.feed * (1 - a));
            this.next[x][y].b = b + (this.dB * laplaceB + abb - (this.kill + this.feed) * b);
            
            // Constrain values
            this.next[x][y].a = p.constrain(this.next[x][y].a, 0, 1);
            this.next[x][y].b = p.constrain(this.next[x][y].b, 0, 1);
          }
        }

        // Swap grids
        let temp = this.grid;
        this.grid = this.next;
        this.next = temp;

        // Draw
        p.loadPixels();
        for (let x = 0; x < this.cols; x++) {
          for (let y = 0; y < this.rows; y++) {
            let a = this.grid[x][y].a;
            let b = this.grid[x][y].b;
            
            // Color based on concentration
            let c = p.floor((a - b) * 255);
            c = p.constrain(c, 0, 255);
            
            // Fill pixel area
            for (let dx = 0; dx < this.resolution; dx++) {
              for (let dy = 0; dy < this.resolution; dy++) {
                let px = x * this.resolution + dx;
                let py = y * this.resolution + dy;
                if (px < p.width && py < p.height) {
                  let pix = (px + py * p.width) * 4;
                  p.pixels[pix + 0] = c;
                  p.pixels[pix + 1] = c;
                  p.pixels[pix + 2] = c;
                  p.pixels[pix + 3] = 255;
                }
              }
            }
          }
        }
        p.updatePixels();

        // Occasionally add more seeds
        if (p.frameCount % 500 === 0) {
          let randX = p.floor(p.random(20, this.cols - 20));
          let randY = p.floor(p.random(20, this.rows - 20));
          for (let i = -5; i <= 5; i++) {
            for (let j = -5; j <= 5; j++) {
              if (i * i + j * j < 25) {
                this.grid[randX + i][randY + j].b = 1;
              }
            }
          }
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
