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

    <!-- Left side toggle button -->
    <div class="side-toggle left" v-if="isContentCompact">
      <button @click="toggleContentMode" class="toggle-button">
        <span class="toggle-text">{{ isContentCompact ? 'EXPAND INFO' : 'HIDE INFO' }}</span>
      </button>
    </div>

    <!-- Right side toggle button -->
    <div class="side-toggle right" v-if="isProjectsCompact">
      <button @click="toggleProjectsMode" class="toggle-button">
        <span class="toggle-text">{{ isProjectsCompact ? 'VIEW PROJECTS' : 'HIDE PROJECTS' }}</span>
      </button>
    </div>

    <!-- Main info overlay (left side) -->
    <div class="overlay left-overlay" :class="{ 'compact': isContentCompact }">
      <div class="content-wrapper" :class="{ 'compact': isContentCompact }">
        <div>
          <HeaderSection />
        </div>
        <div>
          <LogoSection />
        </div>
      </div>
    </div>

    <!-- Projects overlay (right side) -->
    <div class="overlay right-overlay" :class="{ 'compact': isProjectsCompact }">
      <ProjectCards />
    </div>

    <BackgroundSelector v-show="isContentCompact && isProjectsCompact" @background-changed="changeBackground" />
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
      isContentCompact: false,
      isProjectsCompact: false,
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
    toggleContentMode() {
      this.isContentCompact = !this.isContentCompact;
    },
    toggleProjectsMode() {
      this.isProjectsCompact = !this.isProjectsCompact;
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

/* Overlay Styles */
.overlay {
  position: fixed;
  top: 0;
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
  padding: 20px;
  transition: all 0.5s cubic-bezier(0.4, 0.0, 0.2, 1);
}

.left-overlay {
  left: 0;
  width: 50%;
}

.left-overlay.compact {
  width: 0;
  padding: 0;
  opacity: 0;
}

.right-overlay {
  right: 0;
  width: 50%;
  padding: 40px;
}

.right-overlay.compact {
  width: 0;
  padding: 0;
  opacity: 0;
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

/* Side Toggle Buttons */
.side-toggle {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2000;
}

.side-toggle.left {
  left: 20px;
}

.side-toggle.right {
  right: 20px;
}

.toggle-button {
  background: white;
  border: 3px solid black;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 16px 12px;
  cursor: pointer;
  box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
  writing-mode: vertical-rl;
  text-orientation: mixed;
}

.toggle-button:hover {
  box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.3);
  transform: translate(-2px, -2px);
}

.toggle-button:active {
  transform: translate(2px, 2px);
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.2);
}

.toggle-text {
  display: block;
}
</style>