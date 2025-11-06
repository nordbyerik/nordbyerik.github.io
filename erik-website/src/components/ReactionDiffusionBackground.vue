<template>
  <div ref="canvasContainer"></div>
</template>

<script>
import p5 from "p5";

export default {
  name: "ReactionDiffusionBackground",
  data() {
    return {
      grid: null,
      next: null,
      dA: 1.0,
      dB: 0.5,
      feed: 0.055,
      k: 0.062,
    };
  },
  mounted() {
    this.sketch = new p5(this.sketch, this.$refs.canvasContainer);
  },
  methods: {
    sketch(p) {
      let gridWidth, gridHeight;

      p.setup = () => {
        const scale = 0.5; // Render at half resolution for performance
        p.createCanvas(window.innerWidth * scale, window.innerHeight * scale);
        p.pixelDensity(1);
        p.frameRate(20); // Limit frame rate for better performance

        gridWidth = p.floor(p.width / 2);
        gridHeight = p.floor(p.height / 2);

        this.grid = [];
        this.next = [];

        for (let x = 0; x < gridWidth; x++) {
          this.grid[x] = [];
          this.next[x] = [];
          for (let y = 0; y < gridHeight; y++) {
            this.grid[x][y] = { a: 1, b: 0 };
            this.next[x][y] = { a: 1, b: 0 };
          }
        }

        // Seed some initial B chemical in the center
        for (let i = 0; i < 20; i++) {
          let x = p.floor(p.random(gridWidth * 0.4, gridWidth * 0.6));
          let y = p.floor(p.random(gridHeight * 0.4, gridHeight * 0.6));
          for (let dx = -2; dx <= 2; dx++) {
            for (let dy = -2; dy <= 2; dy++) {
              if (x + dx >= 0 && x + dx < gridWidth && y + dy >= 0 && y + dy < gridHeight) {
                this.grid[x + dx][y + dy].b = 1;
              }
            }
          }
        }
      };

      p.draw = () => {
        // Run multiple iterations per frame for faster pattern formation
        for (let n = 0; n < 10; n++) {
          for (let x = 1; x < gridWidth - 1; x++) {
            for (let y = 1; y < gridHeight - 1; y++) {
              let a = this.grid[x][y].a;
              let b = this.grid[x][y].b;

              // Calculate Laplacian using convolution
              let laplaceA =
                this.grid[x][y].a * -1 +
                this.grid[x - 1][y].a * 0.2 +
                this.grid[x + 1][y].a * 0.2 +
                this.grid[x][y - 1].a * 0.2 +
                this.grid[x][y + 1].a * 0.2 +
                this.grid[x - 1][y - 1].a * 0.05 +
                this.grid[x + 1][y - 1].a * 0.05 +
                this.grid[x - 1][y + 1].a * 0.05 +
                this.grid[x + 1][y + 1].a * 0.05;

              let laplaceB =
                this.grid[x][y].b * -1 +
                this.grid[x - 1][y].b * 0.2 +
                this.grid[x + 1][y].b * 0.2 +
                this.grid[x][y - 1].b * 0.2 +
                this.grid[x][y + 1].b * 0.2 +
                this.grid[x - 1][y - 1].b * 0.05 +
                this.grid[x + 1][y - 1].b * 0.05 +
                this.grid[x - 1][y + 1].b * 0.05 +
                this.grid[x + 1][y + 1].b * 0.05;

              // Gray-Scott reaction-diffusion equations
              let abb = a * b * b;
              this.next[x][y].a = a + this.dA * laplaceA - abb + this.feed * (1 - a);
              this.next[x][y].b = b + this.dB * laplaceB + abb - (this.k + this.feed) * b;

              // Constrain values
              this.next[x][y].a = p.constrain(this.next[x][y].a, 0, 1);
              this.next[x][y].b = p.constrain(this.next[x][y].b, 0, 1);
            }
          }

          // Swap grids
          let temp = this.grid;
          this.grid = this.next;
          this.next = temp;
        }

        // Render
        p.loadPixels();
        for (let x = 0; x < gridWidth; x++) {
          for (let y = 0; y < gridHeight; y++) {
            let a = this.grid[x][y].a;
            let b = this.grid[x][y].b;
            let c = p.floor((a - b) * 255);
            c = p.constrain(c, 0, 255);

            // Draw each grid cell as a 2x2 pixel block
            for (let dx = 0; dx < 2; dx++) {
              for (let dy = 0; dy < 2; dy++) {
                let pix = ((y * 2 + dy) * p.width + (x * 2 + dx)) * 4;
                p.pixels[pix] = c;
                p.pixels[pix + 1] = c;
                p.pixels[pix + 2] = c;
                p.pixels[pix + 3] = 255;
              }
            }
          }
        }
        p.updatePixels();
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

/* Scale canvas to full size for performance optimization */
div canvas {
  width: 100% !important;
  height: 100% !important;
}
</style>
