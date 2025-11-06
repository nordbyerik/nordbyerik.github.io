<template>
  <div id="app">
    <!-- Toggle Button with Bauhaus geometric design -->
    <button
      @click="toggleCompactMode"
      class="bauhaus-toggle"
      :class="{ 'compact': isCompact }"
      :title="isCompact ? 'Expand content' : 'Minimize to reveal background'">
      <div class="toggle-icon">
        <div class="square"></div>
        <div class="circle"></div>
        <div class="triangle"></div>
      </div>
    </button>

    <div class="overlay" :class="{ 'compact': isCompact }">
      <div class="content-wrapper" :class="{ 'compact': isCompact }">
        <div>
          <HeaderSection />
        </div>
        <div>
          <LogoSection />
        </div>
      </div>
      <div class="projects-section" v-show="!isCompact">
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
      isCompact: false,
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
    toggleCompactMode() {
      this.isCompact = !this.isCompact;
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
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.95); /* Bauhaus white background */
  color: black;
  font-size: 24px;
  z-index: 1000; /* ensures the overlay is above all other content */
  overflow-y: auto; /* Allow scrolling if content is too tall */
  padding: 20px 0;
  transition: all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1);
}

.overlay.compact {
  width: 320px;
  left: 0;
  background-color: rgba(255, 255, 255, 0.85);
  align-items: flex-start;
  padding: 20px;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.15);
  font-size: 16px;
}

.overlay.compact > div {
  width: 100%;
}

.overlay.compact .projects-section {
  font-size: 0.85em;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content-wrapper.compact {
  height: 100%;
  justify-content: center;
  align-items: center;
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

/* Bauhaus Toggle Button */
.bauhaus-toggle {
  position: fixed;
  top: 20px;
  right: 90px; /* Position to the left of the background selector */
  z-index: 3000; /* Higher than background selector */
  width: 60px;
  height: 60px;
  border: none;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.bauhaus-toggle:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
}

.bauhaus-toggle:active {
  transform: scale(0.95);
}

.toggle-icon {
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Bauhaus geometric shapes */
.toggle-icon .square {
  position: absolute;
  width: 16px;
  height: 16px;
  background: #E1000F; /* Bauhaus red */
  top: 4px;
  left: 4px;
  transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
}

.toggle-icon .circle {
  position: absolute;
  width: 18px;
  height: 18px;
  background: #0033A0; /* Bauhaus blue */
  border-radius: 50%;
  bottom: 4px;
  right: 4px;
  transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
}

.toggle-icon .triangle {
  position: absolute;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 17px solid #FFD100; /* Bauhaus yellow */
  bottom: 4px;
  left: 3px;
  transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
}

/* Animated state when compact */
.bauhaus-toggle.compact .square {
  transform: rotate(45deg);
  left: 12px;
}

.bauhaus-toggle.compact .circle {
  transform: scale(1.2);
}

.bauhaus-toggle.compact .triangle {
  transform: rotate(180deg);
  border-bottom-color: #FFD100;
}
</style>