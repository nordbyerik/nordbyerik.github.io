<template>
  <div id="app">
    <div id="header">
      <h1>Erik Nordby</h1>
    </div>
    <svg ref="svg" :width="width" :height="height"></svg>
    <button @click="scrollToPortfolio" class="down-arrow">⬇</button>
    <div id="portfolio">
      <!-- Portfolio content goes here -->
      <h2>Portfolio</h2>
      <p>Welcome to my portfolio site!</p>
      <!-- Add more portfolio content as needed -->
    </div>
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
       .attr('stroke', 'black')
       .attr('stroke-width', 0.5)
       .attr('d', line);
    },
    scrollToPortfolio() {
      const portfolio = document.getElementById('portfolio');
      portfolio.scrollIntoView({ behavior: 'smooth' });
    }
  }
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #D2B48C; /* softer tan background */
  height: 100vh;
  overflow: hidden;
}

#header {
  position: absolute;
  top: 20px;
  text-align: center;
  width: 100%;
}

#header h1 {
  margin: 0;
  font-size: 2em;
  color: black;
}

svg {
  border: 1px solid #000; /* black border */
  margin-top: 60px; /* space for the title */
}

.down-arrow {
  margin-top: 20px;
  background: none;
  border: none;
  font-size: 2em;
  cursor: pointer;
  color: black;
}

#portfolio {
  background-color: #F5F5F5;
  width: 100%;
  padding: 50px;
  text-align: center;
}

#portfolio h2 {
  margin-top: 0;
}
</style>