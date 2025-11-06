<template>
  <div class="background-selector">
    <select v-model="selectedBackground" @change="onChange" class="background-dropdown">
      <option value="lorenz">Lorenz Attractor</option>
      <option value="boids">Boids</option>
      <option value="lsystem">L-System</option>
      <option value="gameoflife">Game of Life</option>
      <option value="fractal">Fractal</option>
      <option value="slimemold">Slime Mold</option>
      <option value="antcolony">Ant Colony</option>
      <option value="reactiondiffusion">Reaction-Diffusion</option>
      <option value="voronoi">Voronoi Cells</option>
      <option value="differentialgrowth">Differential Growth</option>
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
  border: 2px solid black;
  background-color: white;
  color: black;
  cursor: pointer;
  outline: none;
}
</style>
