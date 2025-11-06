<template>
  <div ref="canvasContainer"></div>
</template>

<script>
import p5 from "p5";

export default {
  name: "VoronoiBackground",
  data() {
    return {
      points: [],
    };
  },
  mounted() {
    this.sketch = new p5(this.sketch, this.$refs.canvasContainer);
  },
  methods: {
    sketch(p) {
      class VoronoiPoint {
        constructor() {
          this.x = p.random(p.width);
          this.y = p.random(p.height);
          this.vx = p.random(-1, 1);
          this.vy = p.random(-1, 1);
          this.hue = p.random(360);
        }

        update() {
          this.x += this.vx;
          this.y += this.vy;

          // Bounce off edges
          if (this.x < 0 || this.x > p.width) {
            this.vx *= -1;
            this.x = p.constrain(this.x, 0, p.width);
          }
          if (this.y < 0 || this.y > p.height) {
            this.vy *= -1;
            this.y = p.constrain(this.y, 0, p.height);
          }
        }
      }

      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);
        p.colorMode(p.HSB, 360, 100, 100);
        p.pixelDensity(1);

        // Create Voronoi points
        for (let i = 0; i < 40; i++) {
          this.points.push(new VoronoiPoint());
        }
      };

      p.draw = () => {
        // Update points
        for (let point of this.points) {
          point.update();
        }

        // Draw Voronoi diagram using pixel-based approach
        p.loadPixels();
        let step = 3; // Sample every 3 pixels for performance

        for (let x = 0; x < p.width; x += step) {
          for (let y = 0; y < p.height; y += step) {
            let minDist = Infinity;
            let closest = null;

            // Find closest point
            for (let point of this.points) {
              let d = p.dist(x, y, point.x, point.y);
              if (d < minDist) {
                minDist = d;
                closest = point;
              }
            }

            if (closest) {
              // Color based on distance to create organic look
              let brightness = p.map(minDist, 0, 200, 100, 60);
              brightness = p.constrain(brightness, 60, 100);

              let col = p.color(0, 0, brightness);
              let r = p.red(col);
              let g = p.green(col);
              let b = p.blue(col);

              // Fill a block of pixels
              for (let dx = 0; dx < step && x + dx < p.width; dx++) {
                for (let dy = 0; dy < step && y + dy < p.height; dy++) {
                  let pix = ((y + dy) * p.width + (x + dx)) * 4;
                  p.pixels[pix] = r;
                  p.pixels[pix + 1] = g;
                  p.pixels[pix + 2] = b;
                  p.pixels[pix + 3] = 255;
                }
              }
            }
          }
        }
        p.updatePixels();

        // Draw cell boundaries
        p.strokeWeight(1);
        p.stroke(0, 100);
        for (let x = 0; x < p.width; x += step) {
          for (let y = 0; y < p.height; y += step) {
            let minDist = Infinity;
            let closest = null;

            for (let point of this.points) {
              let d = p.dist(x, y, point.x, point.y);
              if (d < minDist) {
                minDist = d;
                closest = point;
              }
            }

            // Check neighbors for boundaries
            let isEdge = false;
            for (let dx = -step; dx <= step; dx += step) {
              for (let dy = -step; dy <= step; dy += step) {
                if (dx === 0 && dy === 0) continue;
                let nx = x + dx;
                let ny = y + dy;
                if (nx >= 0 && nx < p.width && ny >= 0 && ny < p.height) {
                  let nMinDist = Infinity;
                  let nClosest = null;
                  for (let point of this.points) {
                    let d = p.dist(nx, ny, point.x, point.y);
                    if (d < nMinDist) {
                      nMinDist = d;
                      nClosest = point;
                    }
                  }
                  if (nClosest !== closest) {
                    isEdge = true;
                    break;
                  }
                }
              }
              if (isEdge) break;
            }

            if (isEdge) {
              p.point(x, y);
            }
          }
        }

        // Draw center points
        p.fill(0);
        p.noStroke();
        for (let point of this.points) {
          p.ellipse(point.x, point.y, 4, 4);
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
