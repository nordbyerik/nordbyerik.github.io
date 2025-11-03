<template>
  <div id="app">
    <div class="overlay">
      <div>
        <HeaderSection />
      </div>
      <div>
        <LogoSection />
      </div>
      <div class="projects-section">
        <ProjectCards />
      </div>
    </div>
    <BackgroundSelector @background-changed="changeBackground" />
    <component :is="currentBackground" class="attractor" :key="currentBackground" />
  </div>
</template>

<script>
import HeaderSection from "./components/HeaderSection.vue";
import LorenzAttractor from "./components/LorenzAttractor.vue";
import BoidsBackground from "./components/BoidsBackground.vue";
import LSystemBackground from "./components/LSystemBackground.vue";
import GameOfLifeBackground from "./components/GameOfLifeBackground.vue";
import FractalBackground from "./components/FractalBackground.vue";
import LogoSection from "./components/LogoSection.vue";
import ProjectCards from "./components/ProjectCards.vue";
import BackgroundSelector from "./components/BackgroundSelector.vue";

export default {
  name: "App",
  components: {
    HeaderSection,
    LorenzAttractor,
    BoidsBackground,
    LSystemBackground,
    GameOfLifeBackground,
    FractalBackground,
    LogoSection,
    ProjectCards,
    BackgroundSelector
  },
  data() {
    return {
      currentBackground: "LorenzAttractor",
    };
  },
  methods: {
    scrollToSection(id) {
      const section = document.getElementById(id);
      section.scrollIntoView({ behavior: "smooth" });
    },
    changeBackground(backgroundType) {
      const backgroundMap = {
        lorenz: "LorenzAttractor",
        boids: "BoidsBackground",
        lsystem: "LSystemBackground",
        gameoflife: "GameOfLifeBackground",
        fractal: "FractalBackground",
      };
      this.currentBackground = backgroundMap[backgroundType];
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-weight: 400;
}

#app {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.attractor {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: 24px;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Changed from center to flex-start */
  justify-content: flex-start; /* Changed from center to flex-start */
  background: linear-gradient(to right, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.75) 55%, rgba(255, 255, 255, 0) 100%); /* Gradient fade for asymmetric layout */
  color: black;
  font-size: 24px;
  z-index: 1000; /* ensures the overlay is above all other content */
  overflow-y: auto; /* Allow scrolling if content is too tall */
  padding: 40px 0 40px 60px; /* Left-aligned padding */
}

.projects-section {
  width: 100%;
  max-width: 650px; /* Constrain to left side */
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Left-align */
}

.projects-section h2 {
  display: none; /* Hide the heading as it's not in the reference image */
}

@media (max-width: 768px) {
  .overlay {
    padding: 30px 20px;
    background: rgba(255, 255, 255, 0.70); /* More uniform on mobile */
    align-items: center;
    justify-content: center;
  }
  
  .projects-section {
    max-width: 100%;
    align-items: center;
  }
}
</style>