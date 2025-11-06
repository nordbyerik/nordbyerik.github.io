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
      // Spatial hash grid for efficient neighbor queries
      class SpatialHash {
        constructor(cellSize) {
          this.cellSize = cellSize;
          this.grid = new Map();
        }

        clear() {
          this.grid.clear();
        }

        // Get grid cell key for a position
        getKey(x, y) {
          const cellX = Math.floor(x / this.cellSize);
          const cellY = Math.floor(y / this.cellSize);
          return `${cellX},${cellY}`;
        }

        // Insert a boid into the grid
        insert(boid) {
          const key = this.getKey(boid.position.x, boid.position.y);
          if (!this.grid.has(key)) {
            this.grid.set(key, []);
          }
          this.grid.get(key).push(boid);
        }

        // Get all boids in the same cell and neighboring cells
        getNearby(x, y) {
          const nearby = [];
          const cellX = Math.floor(x / this.cellSize);
          const cellY = Math.floor(y / this.cellSize);

          // Check 9 cells (current + 8 neighbors)
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              const key = `${cellX + i},${cellY + j}`;
              if (this.grid.has(key)) {
                nearby.push(...this.grid.get(key));
              }
            }
          }
          return nearby;
        }
      }

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

      let spatialHash;

      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);

        // Cell size = max perception radius (50px) to ensure we check all relevant neighbors
        spatialHash = new SpatialHash(50);

        // 100 boids with spatial partitioning = much faster than 50 without!
        // Spatial hash reduces complexity from O(n²) to O(n)
        for (let i = 0; i < 100; i++) {
          this.flock.push(new Boid());
        }
      };

      p.draw = () => {
        p.background(255);

        // Rebuild spatial hash each frame
        spatialHash.clear();
        for (let boid of this.flock) {
          spatialHash.insert(boid);
        }

        // Update boids using only nearby neighbors
        for (let boid of this.flock) {
          boid.edges();

          // Get only nearby boids instead of all boids (huge performance win!)
          const nearbyBoids = spatialHash.getNearby(boid.position.x, boid.position.y);
          boid.flock(nearbyBoids);

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
