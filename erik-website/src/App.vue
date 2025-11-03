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
import SandpileBackground from "./components/SandpileBackground.vue";
import NeuralCABackground from "./components/NeuralCABackground.vue";
import ReactionDiffusionBackground from "./components/ReactionDiffusionBackground.vue";
import VoronoiBackground from "./components/VoronoiBackground.vue";
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
    SandpileBackground,
    NeuralCABackground,
    ReactionDiffusionBackground,
    VoronoiBackground,
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
        sandpile: "SandpileBackground",
        neuralca: "NeuralCABackground",
        reactiondiffusion: "ReactionDiffusionBackground",
        voronoi: "VoronoiBackground",
      };
      this.currentBackground = backgroundMap[backgroundType];
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto+Condensed");
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');
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
  align-items: center;
  justify-content: center;
  background-color: rgba(242, 219, 192, 0.884); /* Lighter transparent overlay */
  color: black;
  font-size: 24px;
  z-index: 1000; /* ensures the overlay is above all other content */
  overflow-y: auto; /* Allow scrolling if content is too tall */
  padding: 20px 0;
}

.projects-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.projects-section h2 {
  display: none; /* Hide the heading as it's not in the reference image */
}
</style>