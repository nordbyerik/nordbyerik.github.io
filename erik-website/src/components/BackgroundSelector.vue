<template>
  <div class="background-selector">
    <select v-model="selectedBackground" @change="onChange" class="background-dropdown">
      <option value="lorenz">Lorenz Attractor</option>
      <option value="boids">Boids</option>
      <option value="lsystem">L-System</option>
      <option value="gameoflife">Game of Life</option>
      <option value="fractal">Fractal</option>
      <option value="sandpile">Sandpile Model</option>
      <option value="neuralca">Neural Cellular Automata</option>
      <option value="reactiondiffusion">Reaction-Diffusion</option>
      <option value="voronoi">Voronoi Diagram</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "BackgroundSelector",
  data() {
    return {
      selectedBackground: "lorenz",
    };
  },
  methods: {
    onChange() {
      this.$emit("background-changed", this.selectedBackground);
    },
  },
};
</script>

<style scoped>
.background-selector {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 2000;
}

.background-dropdown {
  padding: 10px 15px;
  font-size: 14px;
  font-family: 'Montserrat', sans-serif;
  border: 2px solid rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.9);
  color: #333;
  cursor: pointer;
  outline: none;
  transition: all 0.3s ease;
}

.background-dropdown:hover {
  background-color: rgba(255, 255, 255, 1);
  border-color: rgba(0, 0, 0, 0.5);
}

.background-dropdown:focus {
  border-color: rgba(0, 0, 0, 0.7);
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
}
</style>
