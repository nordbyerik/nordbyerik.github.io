<template>
  <div ref="canvasContainer"></div>
</template>

<script>
import p5 from "p5";

export default {
  name: "DifferentialGrowthBackground",
  data() {
    return {
      nodes: [],
    };
  },
  mounted() {
    this.sketch = new p5(this.sketch, this.$refs.canvasContainer);
  },
  methods: {
    sketch(p) {
      const maxForce = 0.5;
      const maxSpeed = 2;
      const desiredSeparation = 8;
      const maxEdgeLen = 12;

      class Node {
        constructor(x, y) {
          this.pos = p.createVector(x, y);
          this.vel = p.createVector(0, 0);
          this.acc = p.createVector(0, 0);
        }

        applyForce(force) {
          this.acc.add(force);
        }

        update() {
          this.vel.add(this.acc);
          this.vel.limit(maxSpeed);
          this.pos.add(this.vel);
          this.acc.mult(0);
        }

        separate(nodes) {
          let sum = p.createVector(0, 0);
          let count = 0;

          for (let other of nodes) {
            let d = p5.Vector.dist(this.pos, other.pos);
            if (d > 0 && d < desiredSeparation) {
              let diff = p5.Vector.sub(this.pos, other.pos);
              diff.normalize();
              diff.div(d); // Weight by distance
              sum.add(diff);
              count++;
            }
          }

          if (count > 0) {
            sum.div(count);
            sum.normalize();
            sum.mult(maxSpeed);
            let steer = p5.Vector.sub(sum, this.vel);
            steer.limit(maxForce);
            return steer;
          }
          return p.createVector(0, 0);
        }

        attract(prev, next) {
          let force = p.createVector(0, 0);
          if (prev) {
            let desired = p5.Vector.sub(prev.pos, this.pos);
            let d = desired.mag();
            if (d > maxEdgeLen) {
              desired.normalize();
              desired.mult(maxSpeed);
              let steer = p5.Vector.sub(desired, this.vel);
              steer.limit(maxForce * 0.5);
              force.add(steer);
            }
          }
          if (next) {
            let desired = p5.Vector.sub(next.pos, this.pos);
            let d = desired.mag();
            if (d > maxEdgeLen) {
              desired.normalize();
              desired.mult(maxSpeed);
              let steer = p5.Vector.sub(desired, this.vel);
              steer.limit(maxForce * 0.5);
              force.add(steer);
            }
          }
          return force;
        }
      }

      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);

        // Create initial circular path
        let radius = 100;
        let centerX = p.width / 2;
        let centerY = p.height / 2;
        let numNodes = 40;

        for (let i = 0; i < numNodes; i++) {
          let angle = p.map(i, 0, numNodes, 0, p.TWO_PI);
          let x = centerX + p.cos(angle) * radius;
          let y = centerY + p.sin(angle) * radius;
          this.nodes.push(new Node(x, y));
        }
      };

      p.draw = () => {
        p.background(255);

        // Update nodes
        for (let i = 0; i < this.nodes.length; i++) {
          let node = this.nodes[i];
          let prev = this.nodes[(i - 1 + this.nodes.length) % this.nodes.length];
          let next = this.nodes[(i + 1) % this.nodes.length];

          let separate = node.separate(this.nodes);
          let attract = node.attract(prev, next);

          separate.mult(1.5); // Stronger separation for growth effect
          attract.mult(0.8);

          node.applyForce(separate);
          node.applyForce(attract);
          node.update();
        }

        // Insert new nodes where edges are too long
        for (let i = this.nodes.length - 1; i >= 0; i--) {
          let node = this.nodes[i];
          let next = this.nodes[(i + 1) % this.nodes.length];
          let d = p5.Vector.dist(node.pos, next.pos);

          if (d > maxEdgeLen) {
            let mid = p5.Vector.add(node.pos, next.pos);
            mid.div(2);
            // Add some randomness to create organic growth
            mid.x += p.random(-2, 2);
            mid.y += p.random(-2, 2);
            this.nodes.splice(i + 1, 0, new Node(mid.x, mid.y));
          }
        }

        // Limit number of nodes for performance
        if (this.nodes.length > 800) {
          // Remove every other node
          for (let i = this.nodes.length - 1; i >= 0; i -= 2) {
            this.nodes.splice(i, 1);
          }
        }

        // Draw the path
        p.noFill();
        p.stroke(0);
        p.strokeWeight(2);
        p.beginShape();
        for (let node of this.nodes) {
          p.vertex(node.pos.x, node.pos.y);
        }
        p.endShape(p.CLOSE);

        // Draw nodes
        p.fill(0);
        p.noStroke();
        for (let node of this.nodes) {
          p.ellipse(node.pos.x, node.pos.y, 3, 3);
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
