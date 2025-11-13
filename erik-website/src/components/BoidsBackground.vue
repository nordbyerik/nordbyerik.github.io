<template>
  <div ref="canvasContainer"></div>
</template>

<script>
import p5 from "p5";

export default {
  name: "BoidsBackground",
  data() {
    return {
      flock: [],
    };
  },
  mounted() {
    this.sketch = new p5(this.sketch, this.$refs.canvasContainer);
  },
  methods: {
    sketch(p) {
      class Boid {
        constructor() {
          this.position = p.createVector(p.random(p.width), p.random(p.height));
          this.velocity = p5.Vector.random2D();
          this.velocity.setMag(p.random(2, 4));
          this.acceleration = p.createVector();
          this.maxForce = 0.2;
          this.maxSpeed = 4;
        }

        edges() {
          if (this.position.x > p.width) this.position.x = 0;
          else if (this.position.x < 0) this.position.x = p.width;
          if (this.position.y > p.height) this.position.y = 0;
          else if (this.position.y < 0) this.position.y = p.height;
        }

        align(boids) {
          let perceptionRadius = 50;
          let steering = p.createVector();
          let total = 0;
          for (let other of boids) {
            let d = p.dist(
              this.position.x,
              this.position.y,
              other.position.x,
              other.position.y
            );
            if (other !== this && d < perceptionRadius) {
              steering.add(other.velocity);
              total++;
            }
          }
          if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
          }
          return steering;
        }

        cohesion(boids) {
          let perceptionRadius = 50;
          let steering = p.createVector();
          let total = 0;
          for (let other of boids) {
            let d = p.dist(
              this.position.x,
              this.position.y,
              other.position.x,
              other.position.y
            );
            if (other !== this && d < perceptionRadius) {
              steering.add(other.position);
              total++;
            }
          }
          if (total > 0) {
            steering.div(total);
            steering.sub(this.position);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
          }
          return steering;
        }

        separation(boids) {
          let perceptionRadius = 25;
          let steering = p.createVector();
          let total = 0;
          for (let other of boids) {
            let d = p.dist(
              this.position.x,
              this.position.y,
              other.position.x,
              other.position.y
            );
            if (other !== this && d < perceptionRadius) {
              let diff = p5.Vector.sub(this.position, other.position);
              diff.div(d * d);
              steering.add(diff);
              total++;
            }
          }
          if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
          }
          return steering;
        }

        flock(boids) {
          let alignment = this.align(boids);
          let cohesion = this.cohesion(boids);
          let separation = this.separation(boids);

          this.acceleration.add(alignment);
          this.acceleration.add(cohesion);
          this.acceleration.add(separation);
        }

        update() {
          this.position.add(this.velocity);
          this.velocity.add(this.acceleration);
          this.velocity.limit(this.maxSpeed);
          this.acceleration.mult(0);
        }

        show() {
          p.strokeWeight(8);
          p.stroke(0);
          p.point(this.position.x, this.position.y);
        }
      }

      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);
        for (let i = 0; i < 100; i++) {
          this.flock.push(new Boid());
        }
      };

      p.draw = () => {
        p.background(255);

        for (let boid of this.flock) {
          boid.edges();
          boid.flock(this.flock);
          boid.update();
          boid.show();
        }
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
