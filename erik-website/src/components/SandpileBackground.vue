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
      resolution: 4, // Small cells for detailed patterns
    };
  },
  mounted() {
    this.sketch = new p5(this.sketch, this.$refs.canvasContainer);
  },
  methods: {
    sketch(p) {
      const colors = [
        [255, 255, 255], // 0 grains - white
        [100, 150, 255], // 1 grain - light blue
        [50, 100, 200],  // 2 grains - medium blue
        [20, 50, 150],   // 3 grains - dark blue
      ];

      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);
        p.frameRate(30);

        this.cols = p.floor(p.width / this.resolution);
        this.rows = p.floor(p.height / this.resolution);

        // Initialize grid
        this.grid = [];
        for (let i = 0; i < this.cols; i++) {
          this.grid[i] = [];
          for (let j = 0; j < this.rows; j++) {
            this.grid[i][j] = 0;
          }
        }
      };

      p.draw = () => {
        // Add sand to center every few frames
        if (p.frameCount % 2 === 0) {
          const centerX = p.floor(this.cols / 2);
          const centerY = p.floor(this.rows / 2);
          this.grid[centerX][centerY] += 100; // Add multiple grains for faster pattern
        }

        // Topple cells with 4+ grains
        let toppled = false;
        for (let i = 0; i < this.cols; i++) {
          for (let j = 0; j < this.rows; j++) {
            if (this.grid[i][j] >= 4) {
              this.grid[i][j] -= 4;
              toppled = true;

              // Distribute to neighbors
              if (i > 0) this.grid[i - 1][j]++;
              if (i < this.cols - 1) this.grid[i + 1][j]++;
              if (j > 0) this.grid[i][j - 1]++;
              if (j < this.rows - 1) this.grid[i][j + 1]++;
            }
          }
        }

        // Render only if something changed or every 30 frames
        if (toppled || p.frameCount % 30 === 0) {
          p.noStroke();
          for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
              const val = p.constrain(this.grid[i][j], 0, 3);
              p.fill(colors[val][0], colors[val][1], colors[val][2]);
              p.rect(
                i * this.resolution,
                j * this.resolution,
                this.resolution,
                this.resolution
              );
            }
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
