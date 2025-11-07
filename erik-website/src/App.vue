<template>
  <div id="app">
    <!-- Floating Bauhaus Shapes as decoration -->
    <div class="bauhaus-decorations">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
      <div class="floating-shape shape-4"></div>
      <div class="floating-shape shape-5"></div>
    </div>

    <!-- Main content overlay -->
    <div class="overlay" :class="{ 'compact-left': showBackgrounds, 'compact-right': showProjects }">
      <div class="content-wrapper">
        <div>
          <HeaderSection />
        </div>
        <div>
          <LogoSection />
        </div>

        <!-- Two action buttons -->
        <div class="action-buttons" v-if="!showBackgrounds && !showProjects">
          <button @click="toggleBackgrounds" class="action-button">
            <span class="button-text">EXPLORE BACKGROUNDS</span>
          </button>
          <button @click="toggleProjects" class="action-button">
            <span class="button-text">VIEW PROJECTS</span>
          </button>
        </div>

        <!-- Back button when viewing backgrounds or projects -->
        <div class="back-button-container" v-if="showBackgrounds || showProjects">
          <button @click="goBack" class="back-button">
            <span class="button-text">← BACK</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Projects panel (slides in from right) -->
    <div class="projects-panel" :class="{ 'visible': showProjects }">
      <ProjectCards />
    </div>

    <BackgroundSelector v-show="showBackgrounds" @background-changed="changeBackground" />
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
      showBackgrounds: false,
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
    toggleBackgrounds() {
      this.showBackgrounds = true;
      this.showProjects = false;
    },
    toggleProjects() {
      this.showProjects = true;
      this.showBackgrounds = false;
    },
    goBack() {
      this.showBackgrounds = false;
      this.showProjects = false;
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

/* Floating Bauhaus Shapes Decoration */
.bauhaus-decorations {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 500;
}

.floating-shape {
  position: absolute;
  animation: float 20s ease-in-out infinite;
}

.shape-1 {
  width: 60px;
  height: 60px;
  background: #E1000F;
  top: 10%;
  left: 15%;
  animation-delay: 0s;
  animation-duration: 25s;
}

.shape-2 {
  width: 50px;
  height: 50px;
  background: #0033A0;
  border-radius: 50%;
  top: 60%;
  right: 20%;
  animation-delay: 5s;
  animation-duration: 30s;
}

.shape-3 {
  width: 0;
  height: 0;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  border-bottom: 52px solid #FFD100;
  bottom: 20%;
  left: 25%;
  animation-delay: 10s;
  animation-duration: 22s;
}

.shape-4 {
  width: 40px;
  height: 40px;
  background: #E1000F;
  transform: rotate(45deg);
  top: 30%;
  right: 15%;
  animation-delay: 15s;
  animation-duration: 28s;
}

.shape-5 {
  width: 45px;
  height: 45px;
  background: #0033A0;
  border-radius: 50%;
  bottom: 15%;
  right: 30%;
  animation-delay: 7s;
  animation-duration: 26s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 0.3;
  }
  25% {
    transform: translate(30px, -30px) rotate(90deg);
    opacity: 0.6;
  }
  50% {
    transform: translate(-20px, 40px) rotate(180deg);
    opacity: 0.4;
  }
  75% {
    transform: translate(40px, 20px) rotate(270deg);
    opacity: 0.5;
  }
}

/* Main Overlay */
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
  background-color: rgba(255, 255, 255, 0.95);
  color: black;
  font-size: 24px;
  z-index: 1000;
  overflow-y: auto;
  padding: 20px 0;
  transition: all 0.5s cubic-bezier(0.4, 0.0, 0.2, 1);
}

/* Slide content left when showing backgrounds */
.overlay.compact-left {
  width: 320px;
  left: 0;
  background-color: rgba(255, 255, 255, 0.90);
  padding: 20px;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.15);
}

/* Slide content left when showing projects */
.overlay.compact-right {
  width: 320px;
  left: 0;
  background-color: rgba(255, 255, 255, 0.90);
  padding: 20px;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.15);
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

/* Action Buttons Container */
.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 40px;
}

.action-button {
  background: white;
  border: 3px solid black;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 16px 32px;
  cursor: pointer;
  box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
}

.action-button:hover {
  box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.3);
  transform: translate(-2px, -2px);
}

.action-button:active {
  transform: translate(2px, 2px);
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.2);
}

/* Back Button */
.back-button-container {
  margin-top: 30px;
}

.back-button {
  background: white;
  border: 2px solid black;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 12px 24px;
  cursor: pointer;
  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
}

.back-button:hover {
  box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.3);
  transform: translate(-2px, -2px);
}

.back-button:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.2);
}

/* Projects Panel (slides in from right) */
.projects-panel {
  position: fixed;
  top: 0;
  right: -70%;
  width: 70%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.95);
  z-index: 1000;
  overflow-y: auto;
  padding: 40px;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);
  transition: right 0.5s cubic-bezier(0.4, 0.0, 0.2, 1);
}

.projects-panel.visible {
  right: 0;
}
</style>