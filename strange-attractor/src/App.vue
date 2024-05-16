<template>
  <div id="app">
    <svg ref="svg" :width="width" :height="height"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'App',
  data() {
    return {
      width: 800,
      height: 600,
      x: 0.01,
      y: 0.0,
      z: 0.0
    };
  },
  mounted() {
    this.createLorenzAttractor();
  },
  methods: {
    createLorenzAttractor() {
      const svg = d3.select(this.$refs.svg);
      const g = svg.append('g')
                   .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);

      const dt = 0.01;
      const sigma = 10;
      const rho = 28;
      const beta = 8 / 3;

      const points = [];
      for (let i = 0; i < 10000; i++) {
        const dx = sigma * (this.y - this.x) * dt;
        const dy = (this.x * (rho - this.z) - this.y) * dt;
        const dz = (this.x * this.y - beta * this.z) * dt;

        this.x += dx;
        this.y += dy;
        this.z += dz;

        points.push([this.x, this.y]);
      }

      const scale = 10;
      const line = d3.line()
                     .x(d => d[0] * scale)
                     .y(d => d[1] * scale);

      g.append('path')
       .datum(points)
       .attr('fill', 'none')
       .attr('stroke', 'white')
       .attr('stroke-width', 0.5)
       .attr('d', line);
    }
  }
};
</script>

<style>
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #000;
}
svg {
  border: 1px solid #fff;
}
</style>
