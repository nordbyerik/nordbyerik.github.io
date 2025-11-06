<template>
  <div ref="canvasContainer"></div>
</template>

<script>
import p5 from "p5";

export default {
  name: "AntColonyBackground",
  data() {
    return {
      ants: [],
      food: [],
      pheromones: null,
      colony: null,
    };
  },
  mounted() {
    this.sketch = new p5(this.sketch, this.$refs.canvasContainer);
  },
  methods: {
    sketch(p) {
      class Ant {
        constructor(x, y) {
          this.x = x;
          this.y = y;
          this.angle = p.random(p.TWO_PI);
          this.speed = 1.5;
          this.hasFood = false;
        }

        update(pheromones, food, colony) {
          // Sense pheromones
          let strongestAngle = this.angle;
          let strongestValue = 0;

          for (let i = -2; i <= 2; i++) {
            let testAngle = this.angle + (i * p.PI / 8);
            let testX = this.x + p.cos(testAngle) * 10;
            let testY = this.y + p.sin(testAngle) * 10;

            if (testX >= 0 && testX < p.width && testY >= 0 && testY < p.height) {
              pheromones.loadPixels();
              let index = (p.floor(testY) * p.width + p.floor(testX)) * 4;
              let value = this.hasFood ? pheromones.pixels[index + 1] : pheromones.pixels[index];

              if (value > strongestValue) {
                strongestValue = value;
                strongestAngle = testAngle;
              }
            }
          }

          if (strongestValue > 0) {
            this.angle = strongestAngle;
          } else {
            this.angle += p.random(-p.PI / 4, p.PI / 4);
          }

          // Move
          this.x += p.cos(this.angle) * this.speed;
          this.y += p.sin(this.angle) * this.speed;

          // Check for food
          if (!this.hasFood) {
            for (let i = food.length - 1; i >= 0; i--) {
              let d = p.dist(this.x, this.y, food[i].x, food[i].y);
              if (d < 10) {
                this.hasFood = true;
                food.splice(i, 1);
                break;
              }
            }
          }

          // Check if returned to colony
          if (this.hasFood) {
            let d = p.dist(this.x, this.y, colony.x, colony.y);
            if (d < 30) {
              this.hasFood = false;
            }
          }

          // Wrap edges
          if (this.x < 0) this.x = p.width - 1;
          if (this.x >= p.width) this.x = 0;
          if (this.y < 0) this.y = p.height - 1;
          if (this.y >= p.height) this.y = 0;
        }

        draw() {
          p.fill(this.hasFood ? 100 : 0);
          p.noStroke();
          p.ellipse(this.x, this.y, 4, 4);
        }

        layPheromone(pheromones) {
          pheromones.loadPixels();
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              let px = p.floor(this.x) + dx;
              let py = p.floor(this.y) + dy;
              if (px >= 0 && px < p.width && py >= 0 && py < p.height) {
                let index = (py * p.width + px) * 4;
                if (this.hasFood) {
                  pheromones.pixels[index] = p.min(255, pheromones.pixels[index] + 50); // Red = to home
                } else {
                  pheromones.pixels[index + 1] = p.min(255, pheromones.pixels[index + 1] + 50); // Green = to food
                }
              }
            }
          }
          pheromones.updatePixels();
        }
      }

      p.setup = () => {
        const scale = 0.5; // Render at half resolution for performance
        p.createCanvas(window.innerWidth * scale, window.innerHeight * scale);
        p.frameRate(20); // Limit frame rate for better performance

        this.pheromones = p.createGraphics(p.width, p.height);
        this.pheromones.background(0);

        this.colony = { x: p.width / 2, y: p.height / 2 };

        // Create ants (reduced from 100 to 50 for performance)
        for (let i = 0; i < 50; i++) {
          this.ants.push(new Ant(this.colony.x, this.colony.y));
        }

        // Create food sources
        for (let i = 0; i < 8; i++) {
          let fx = p.random(100, p.width - 100);
          let fy = p.random(100, p.height - 100);
          for (let j = 0; j < 30; j++) {
            this.food.push({
              x: fx + p.random(-30, 30),
              y: fy + p.random(-30, 30),
            });
          }
        }
      };

      p.draw = () => {
        p.background(255);

        // Evaporate pheromones
        this.pheromones.loadPixels();
        for (let i = 0; i < this.pheromones.pixels.length; i += 4) {
          this.pheromones.pixels[i] = p.max(0, this.pheromones.pixels[i] - 2);
          this.pheromones.pixels[i + 1] = p.max(0, this.pheromones.pixels[i + 1] - 2);
        }
        this.pheromones.updatePixels();

        // Draw pheromone trails (subtle)
        p.tint(255, 50);
        p.image(this.pheromones, 0, 0);
        p.noTint();

        // Draw colony
        p.fill(100);
        p.noStroke();
        p.ellipse(this.colony.x, this.colony.y, 60, 60);

        // Draw food
        p.fill(200, 100, 0);
        for (let f of this.food) {
          p.ellipse(f.x, f.y, 5, 5);
        }

        // Update and draw ants
        for (let ant of this.ants) {
          ant.update(this.pheromones, this.food, this.colony);
          ant.layPheromone(this.pheromones);
          ant.draw();
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

/* Scale canvas to full size for performance optimization */
div canvas {
  width: 100% !important;
  height: 100% !important;
}
</style>
