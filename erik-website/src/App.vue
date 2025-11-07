<template>
  <div id="app">
    <!-- Toggle Buttons with Bauhaus geometric design -->
    <div class="toggle-container">
      <div class="toggle-group">
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
        <div class="toggle-caption" :class="{ 'compact': isCompact }" @click="toggleCompactMode">
          {{ isCompact ? 'EXPAND' : 'EXPLORE BACKGROUNDS' }}
        </div>
      </div>
      <div class="toggle-group">
        <button
          @click="toggleProjects"
          class="bauhaus-toggle"
          :class="{ 'active': showProjects }"
          :title="showProjects ? 'Hide projects' : 'Show projects'">
          <div class="toggle-icon">
            <div class="square"></div>
            <div class="circle"></div>
            <div class="triangle"></div>
          </div>
        </button>
        <div class="toggle-caption" :class="{ 'active': showProjects }" @click="toggleProjects">
          {{ showProjects ? 'HIDE PROJECTS' : 'SHOW PROJECTS' }}
        </div>
      </div>
    </div>

    <div class="overlay" :class="{ 'compact': isCompact }">
      <div class="content-wrapper" :class="{ 'compact': isCompact }">
        <div>
          <HeaderSection />
        </div>
        <div>
          <LogoSection />
        </div>
      </div>
      <transition name="projects-fade">
        <div class="projects-section" v-show="showProjects">
          <ProjectCards />
        </div>
      </transition>
    </div>
    <BackgroundSelector v-show="isCompact" @background-changed="changeBackground" />
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
import SlimeMoldBackground from "./components/SlimeMoldBackground.vue";
import AntColonyBackground from "./components/AntColonyBackground.vue";
import ReactionDiffusionBackground from "./components/ReactionDiffusionBackground.vue";
import VoronoiBackground from "./components/VoronoiBackground.vue";
import DifferentialGrowthBackground from "./components/DifferentialGrowthBackground.vue";
import SandpileBackground from "./components/SandpileBackground.vue";
import PrisonersDilemmaBackground from "./components/PrisonersDilemmaBackground.vue";
import RockPaperScissorsBackground from "./components/RockPaperScissorsBackground.vue";
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
    SlimeMoldBackground,
    AntColonyBackground,
    ReactionDiffusionBackground,
    VoronoiBackground,
    DifferentialGrowthBackground,
    SandpileBackground,
    PrisonersDilemmaBackground,
    RockPaperScissorsBackground,
    LogoSection,
    ProjectCards,
    BackgroundSelector
  },
  data() {
    return {
      currentBackground: "LorenzAttractor",
      isCompact: false,
      showProjects: false,
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
        slimemold: "SlimeMoldBackground",
        antcolony: "AntColonyBackground",
        reactiondiffusion: "ReactionDiffusionBackground",
        voronoi: "VoronoiBackground",
        differentialgrowth: "DifferentialGrowthBackground",
        sandpile: "SandpileBackground",
        prisonersdilemma: "PrisonersDilemmaBackground",
        rockpaperscissors: "RockPaperScissorsBackground",
      };
      this.currentBackground = backgroundMap[backgroundType];
    },
    toggleCompactMode() {
      this.isCompact = !this.isCompact;
    },
    toggleProjects() {
      this.showProjects = !this.showProjects;
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

/* Projects fade transition - similar to overlay transition */
.projects-fade-enter-active, .projects-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1);
}

.projects-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.projects-fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.projects-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.projects-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Bauhaus Toggle Container */
.toggle-container {
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3000; /* Higher than background selector */
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 30px;
}

.toggle-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

/* Bauhaus Toggle Button */
.bauhaus-toggle {
  width: 80px;
  height: 80px;
  border: none;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.bauhaus-toggle:hover {
  transform: scale(1.15);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

.bauhaus-toggle:active {
  transform: scale(0.95);
}

.toggle-icon {
  position: relative;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Bauhaus geometric shapes */
.toggle-icon .square {
  position: absolute;
  width: 20px;
  height: 20px;
  background: #E1000F; /* Bauhaus red */
  top: 6px;
  left: 6px;
  transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
}

.toggle-icon .circle {
  position: absolute;
  width: 22px;
  height: 22px;
  background: #0033A0; /* Bauhaus blue */
  border-radius: 50%;
  bottom: 6px;
  right: 6px;
  transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
}

.toggle-icon .triangle {
  position: absolute;
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-bottom: 20px solid #FFD100; /* Bauhaus yellow */
  bottom: 6px;
  left: 5px;
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

/* Animated state when active (projects shown) */
.bauhaus-toggle.active .square {
  transform: rotate(45deg);
  left: 12px;
}

.bauhaus-toggle.active .circle {
  transform: scale(1.2);
}

.bauhaus-toggle.active .triangle {
  transform: rotate(180deg);
  border-bottom-color: #FFD100;
}

/* Bauhaus Caption */
.toggle-caption {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: black;
  background: white;
  padding: 8px 16px;
  border: 2px solid black;
  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
}

.toggle-caption:hover {
  box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.3);
  transform: translate(-2px, -2px);
}

.toggle-caption.compact {
  font-size: 10px;
  padding: 6px 12px;
}

.toggle-caption.active {
  font-size: 10px;
  padding: 6px 12px;
}
</style>