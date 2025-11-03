<template>
  <div ref="canvasContainer"></div>
</template>

<script>
import p5 from "p5";

export default {
  name: "FractalBackground",
  mounted() {
    this.sketch = new p5(this.sketch, this.$refs.canvasContainer);
  },
  methods: {
    sketch(p) {
      let maxIterations = 100;

      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);
        p.pixelDensity(1);
        p.loadPixels();

        // Set bounds for Mandelbrot set
        let minX = -2.5;
        let maxX = 1;
        let minY = -1;
        let maxY = 1;

        // Calculate the range
        let dx = (maxX - minX) / p.width;
        let dy = (maxY - minY) / p.height;

        // Start y
        let y = minY;
        for (let j = 0; j < p.height; j++) {
          // Start x
          let x = minX;
          for (let i = 0; i < p.width; i++) {
            // Now we test, as we iterate z does z^2 + c tend towards infinity?
            let a = x;
            let b = y;
            let n = 0;
            while (n < maxIterations) {
              let aa = a * a;
              let bb = b * b;
              let twoab = 2.0 * a * b;
              a = aa - bb + x;
              b = twoab + y;
              // Infinty in our finite world is simple, let's just consider it 16
              if (aa + bb > 16.0) {
                break; // Bail
              }
              n++;
            }

            // We color each pixel based on how long it takes to get to infinity
            // If we never got there, let's pick the color black
            let pix = (i + j * p.width) * 4;
            if (n == maxIterations) {
              p.pixels[pix + 0] = 0;
              p.pixels[pix + 1] = 0;
              p.pixels[pix + 2] = 0;
            } else {
              // Otherwise, use a grayscale based on iterations
              let bright = p.map(n, 0, maxIterations, 0, 255);
              p.pixels[pix + 0] = bright;
              p.pixels[pix + 1] = bright;
              p.pixels[pix + 2] = bright;
            }
            p.pixels[pix + 3] = 255;
            x += dx;
          }
          y += dy;
        }
        p.updatePixels();
        p.noLoop();
      };

      p.draw = () => {
        // Static drawing, so no need for continuous draw
      };
    },
  },
};
</script>

<style scoped>
.div {
  border: 1px solid black;
}
</style>
