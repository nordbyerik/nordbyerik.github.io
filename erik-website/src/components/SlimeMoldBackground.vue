<template>
  <div ref="canvasContainer"></div>
</template>

<script>
import p5 from "p5";

export default {
  name: "SlimeMoldBackground",
  data() {
    return {
      agents: [],
      trail: null,
    };
  },
  mounted() {
    this.sketch = new p5(this.sketch, this.$refs.canvasContainer);
  },
  methods: {
    sketch(p) {
      class Agent {
        constructor() {
          this.x = p.random(p.width);
          this.y = p.random(p.height);
          this.angle = p.random(p.TWO_PI);
          this.speed = 2;
          this.sensorAngle = p.PI / 4;
          this.sensorDistance = 15;
          this.rotationAngle = p.PI / 4;
        }

        sense(trail, angle) {
          let sensorX = this.x + p.cos(this.angle + angle) * this.sensorDistance;
          let sensorY = this.y + p.sin(this.angle + angle) * this.sensorDistance;

          sensorX = p.constrain(sensorX, 0, p.width - 1);
          sensorY = p.constrain(sensorY, 0, p.height - 1);

          let index = (p.floor(sensorY) * p.width + p.floor(sensorX)) * 4;
          return trail.pixels[index];
        }

        update(trail) {
          // Sense in three directions
          let left = this.sense(trail, -this.sensorAngle);
          let center = this.sense(trail, 0);
          let right = this.sense(trail, this.sensorAngle);

          // Steer based on sensed values
          if (center > left && center > right) {
            // Continue straight
          } else if (center < left && center < right) {
            // Random turn
            this.angle += p.random(-this.rotationAngle, this.rotationAngle);
          } else if (left > right) {
            this.angle -= this.rotationAngle * p.random(0.5, 1);
          } else if (right > left) {
            this.angle += this.rotationAngle * p.random(0.5, 1);
          }

          // Move forward
          this.x += p.cos(this.angle) * this.speed;
          this.y += p.sin(this.angle) * this.speed;

          // Wrap around edges
          if (this.x < 0) this.x = p.width - 1;
          if (this.x >= p.width) this.x = 0;
          if (this.y < 0) this.y = p.height - 1;
          if (this.y >= p.height) this.y = 0;
        }

        draw() {
          p.stroke(0);
          p.strokeWeight(1);
          p.point(this.x, this.y);
        }
      }

      p.setup = () => {
        const scale = 0.5; // Render at half resolution for performance
        p.createCanvas(window.innerWidth * scale, window.innerHeight * scale);
        p.frameRate(20); // Limit frame rate for better performance

        this.trail = p.createGraphics(p.width, p.height);
        this.trail.background(255);

        // Initialize agents (reduced from 5000 to 2000 for performance)
        for (let i = 0; i < 2000; i++) {
          this.agents.push(new Agent());
        }
      };

      p.draw = () => {
        // Fade trail slightly
        this.trail.loadPixels();
        for (let i = 0; i < this.trail.pixels.length; i += 4) {
          this.trail.pixels[i] = p.min(255, this.trail.pixels[i] + 5);
          this.trail.pixels[i + 1] = p.min(255, this.trail.pixels[i + 1] + 5);
          this.trail.pixels[i + 2] = p.min(255, this.trail.pixels[i + 2] + 5);
        }
        this.trail.updatePixels();

        // Draw agents on trail
        for (let agent of this.agents) {
          agent.update(this.trail);
          this.trail.stroke(0, 150);
          this.trail.strokeWeight(2);
          this.trail.point(agent.x, agent.y);
        }

        p.background(255);
        p.image(this.trail, 0, 0);
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
