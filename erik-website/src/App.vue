<template>
  <div id="app">
    <div id="header">
      <h1>Erik Nordby</h1>
      <nav>
        <a @click="scrollToSection('about')">About Me</a>
        <a @click="scrollToSection('projects')">Projects</a>
        <a @click="scrollToSection('contact')">Contact</a>
      </nav>
    </div>
    <svg ref="svg" :width="width" :height="height"></svg>
    <button @click="scrollToPortfolio" class="down-arrow">⬇</button>
    <div id="portfolio">
      <section id="about">
        <h2>About Me</h2>
        <p>Hello! I'm Erik Nordby, a software engineer with a passion for AI and machine learning.</p>
        <p>I am currently pursuing a Master's in Deep Learning and considering a PhD related to AI Safety.</p>
        <p>With extensive experience in software development and a keen interest in cutting-edge technology, I am eager to contribute to innovative projects and explore new opportunities.</p>
      </section>
      <section id="projects">
        <h2>Projects</h2>
        <ul>
          <li><strong>Project 1:</strong> Description of the first project.</li>
          <li><strong>Project 2:</strong> Description of the second project.</li>
          <li><strong>Project 3:</strong> Description of the third project.</li>
        </ul>
      </section>
      <section id="contact">
        <h2>Contact</h2>
        <p>Feel free to reach out to me through the following channels:</p>
        <ul>
          <li>Email: <a href="mailto:erik.nordby@example.com">erik.nordby@example.com</a></li>
          <li>LinkedIn: <a href="https://www.linkedin.com/in/eriknordby" target="_blank">linkedin.com/in/eriknordby</a></li>
          <li>GitHub: <a href="https://github.com/eriknordby" target="_blank">github.com/eriknordby</a></li>
        </ul>
      </section>
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
      particles: []
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

      const numParticles = 100;
      const scale = 10;

      // Initialize particles
      for (let i = 0; i < numParticles; i++) {
        this.particles.push({
          x: 0.01 + Math.random() * 0.02 - 0.01,
          y: 0.0 + Math.random() * 0.02 - 0.01,
          z: 0.0 + Math.random() * 0.02 - 0.01,
          points: []
        });
      }

      // Create path for each particle
      const paths = g.selectAll('path')
                     .data(this.particles)
                     .enter()
                     .append('path')
                     .attr('fill', 'none')
                     .attr('stroke', 'black')
                     .attr('stroke-width', 0.5);

      // Animation function
      const animate = () => {
        this.particles.forEach(particle => {
          for (let i = 0; i < 10; i++) { // Increase speed of animation
            this.updateLorenzAttractor(particle, sigma, rho, beta, dt);
          }
        });

        paths.attr('d', d => d3.line()
                               .x(p => p[0] * scale)
                               .y(p => p[1] * scale)(d.points));
        requestAnimationFrame(animate);
      };

      animate();
    },
    updateLorenzAttractor(particle, sigma, rho, beta, dt) {
      const dx = sigma * (particle.y - particle.x) * dt;
      const dy = (particle.x * (rho - particle.z) - particle.y) * dt;
      const dz = (particle.x * particle.y - beta * particle.z) * dt;

      particle.x += dx;
      particle.y += dy;
      particle.z += dz;

      particle.points.push([particle.x, particle.y]);

      if (particle.points.length > 100) {
        particle.points.shift(); // Remove old points to keep the animation smooth
      }
    },
    scrollToPortfolio() {
      const portfolio = document.getElementById('portfolio');
      portfolio.scrollIntoView({ behavior: 'smooth' });
    },
    scrollToSection(id) {
      const section = document.getElementById(id);
      section.scrollIntoView({ behavior: 'smooth' });
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

#header nav {
  margin-top: 10px;
}

#header nav a {
  margin: 0 10px;
  cursor: pointer;
  color: black;
  text-decoration: none;
  font-size: 1.2em;
}

#header nav a:hover {
  text-decoration: underline;
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

#portfolio section {
  margin: 50px 0;
}

#portfolio h2 {
  margin-top: 0;
}
</style>
