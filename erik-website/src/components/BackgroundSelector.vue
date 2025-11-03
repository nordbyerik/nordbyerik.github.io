<template>
  <div class="background-selector">
    <select v-model="selectedBackground" @change="onChange" class="background-dropdown">
      <option value="lorenz">Lorenz Attractor</option>
      <option value="boids">Boids</option>
      <option value="lsystem">L-System</option>
      <option value="gameoflife">Game of Life</option>
      <option value="fractal">Fractal</option>
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
  padding: 12px 16px;
  font-size: 14px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  border: 3px solid #000;
  border-radius: 0;
  background-color: #fff;
  color: #000;
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.background-dropdown:hover {
  background-color: #000;
  color: #fff;
}

.background-dropdown:focus {
  border-color: #000;
  box-shadow: 4px 4px 0 0 #000;
}
</style>
