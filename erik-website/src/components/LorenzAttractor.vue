<template>
  <div ref="canvasContainer"></div>
</template>

<script>
import p5 from "p5";

export default {
  name: "LorenzAttractor",
  data() {
    return {
      pointsData: [
        { x: -15, y: 2.5, z: 28.5 },
        { x: -15.5, y: 2, z: 29 },
        { x: -15, y: 2.5, z: 28 },
      ],
      a: 10,
      b: 28,
      c: 8.0 / 3.0,
      trails: [[]], // Adjusting this to an array of arrays for individual trails
    };
  },
  mounted() {
    this.sketch = new p5(this.sketch, this.$refs.canvasContainer);
  },
  methods: {
    sketch(p) {
      p.setup = () => {
        // eslint-disable-next-line
        p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
        p.colorMode(p.RGB);
        this.trails = this.pointsData.map(() => []); // Initialize a trail array for each point
      };

      p.draw = () => {
        p.background(211, 181, 141);

        let dt = 0.01;

        this.pointsData.forEach((data, index) => {
          let dx = this.a * (data.y - data.x) * dt;
          let dy = (data.x * (this.b - data.z) - data.y) * dt;
          let dz = (data.x * data.y - this.c * data.z) * dt;
          data.x += dx;
          data.y += dy;
          data.z += dz;

          this.trails[index].push(p.createVector(data.x, data.y, data.z));

          if (this.trails[index].length > 100) {
            this.trails[index].splice(0, 1);
          }
        });

        p.translate(0, 0, -80);
        let camX = p.map(p.mouseX, 0, p.width, -250, 250);
        let camY = p.map(p.mouseY, 0, p.height, -250, 250);
        p.camera(
          camX,
          camY,
          p.height / 2.0 / p.tan((p.PI * 30.0) / 180.0),
          0,
          0,
          0,
          0,
          1,
          0
        );
        p.scale(10);
        p.stroke(255);
        p.noFill();

        this.trails.forEach((trail) => {
          p.beginShape();
          trail.forEach((v) => {
            p.stroke(0, 0, 0); // You can change color per trail if desired
            p.vertex(v.x, v.y, v.z);
          });
          p.endShape();
        });
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
