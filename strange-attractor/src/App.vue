<template>
  <div id="app" class="bg-gray-900 text-white min-h-screen flex flex-col">
    <header class="bg-gray-800 p-6">
      <h1 class="text-4xl font-bold">{{ name }}</h1>
      <p class="text-xl">{{ title }}</p>
    </header>
    <nav class="bg-gray-700 p-4">
      <ul class="flex justify-center space-x-6">
        <li><a href="#about" class="text-gray-300 hover:text-white">About</a></li>
        <li><a href="#skills" class="text-gray-300 hover:text-white">Skills</a></li>
        <li><a href="#projects" class="text-gray-300 hover:text-white">Projects</a></li>
        <li><a href="#contact" class="text-gray-300 hover:text-white">Contact</a></li>
      </ul>
    </nav>
    <section id="attractor" class="flex-grow flex justify-center items-center">
      <svg ref="svg" :width="width" :height="height"></svg>
    </section>
    <section id="about" class="p-8">
      <h2 class="text-3xl font-bold mb-4">About Me</h2>
      <p>{{ about }}</p>
    </section>
    <section id="skills" class="p-8 bg-gray-800">
      <h2 class="text-3xl font-bold mb-4">Skills</h2>
      <ul class="list-disc list-inside">
        <li v-for="skill in skills" :key="skill">{{ skill }}</li>
      </ul>
    </section>
    <section id="projects" class="p-8">
      <h2 class="text-3xl font-bold mb-4">Projects</h2>
      <ul class="space-y-4">
        <li v-for="project in projects" :key="project.name">
          <a :href="project.link" class="text-blue-400 hover:underline" target="_blank">{{ project.name }}</a>: {{ project.description }}
        </li>
      </ul>
    </section>
    <section id="contact" class="p-8 bg-gray-800">
      <h2 class="text-3xl font-bold mb-4">Contact</h2>
      <p>{{ contact }}</p>
    </section>
    <footer class="bg-gray-800 p-4 text-center">
      <p>&copy; {{ new Date().getFullYear() }} {{ name }}</p>
    </footer>
  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'App',
  data() {
    return {
      name: 'John Doe',
      title: 'Software Engineer',
      about: 'I am a passionate software engineer with experience in developing scalable applications and working with cutting-edge technologies.',
      skills: ['JavaScript', 'Vue.js', 'D3.js', 'Node.js', 'Python'],
      projects: [
        { name: 'Project One', description: 'A cool project using Vue.js.', link: '#' },
        { name: 'Project Two', description: 'An innovative project with D3.js.', link: '#' },
        { name: 'Project Three', description: 'A scalable application with Node.js.', link: '#' }
      ],
      contact: 'You can reach me at john.doe@example.com',
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

<style scoped>
html, body {
  margin: 0;
  font-family: 'Inter', sans-serif;
}
</style>
