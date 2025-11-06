<template>
  <div id="app">
    <!-- Bauhaus Geometric Decorations -->
    <div class="bauhaus-decorations" v-show="!isCompact">
      <div class="deco-circle red"></div>
      <div class="deco-square blue"></div>
      <div class="deco-triangle yellow"></div>
      <div class="deco-line black"></div>
    </div>

    <!-- Main Content Overlay -->
    <div class="overlay" :class="{ 'compact': isCompact }">
      <!-- Compact Sidebar (when exploring backgrounds) -->
      <div class="sidebar-header" v-if="isCompact">
        <h2>EXPLORE</h2>
        <p class="sidebar-subtitle">Choose a background</p>
      </div>

      <div class="content-wrapper" :class="{ 'compact': isCompact }">
        <div>
          <HeaderSection />
        </div>
        <div>
          <LogoSection />
        </div>
      </div>

      <!-- Background Selector integrated into sidebar -->
      <BackgroundSelector
        v-if="isCompact"
        @background-changed="changeBackground"
        class="sidebar-selector"
      />

      <div class="projects-section" v-show="!isCompact">
        <ProjectCards />
      </div>

      <!-- Toggle Button integrated into layout -->
      <button
        @click="toggleCompactMode"
        class="bauhaus-toggle"
        :class="{ 'compact': isCompact }"
        :title="isCompact ? 'Show full content' : 'Explore backgrounds'">
        <div class="toggle-icon">
          <div class="square"></div>
          <div class="circle"></div>
          <div class="triangle"></div>
        </div>
        <span class="toggle-label">{{ isCompact ? 'EXPAND' : 'BACKGROUNDS' }}</span>
      </button>
    </div>

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
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;800&display=swap');

html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: 'Montserrat', sans-serif;
}

#app {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.attractor {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

/* Bauhaus Geometric Decorations */
.bauhaus-decorations {
  position: fixed;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 999;
}

.deco-circle {
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  top: 60px;
  right: 80px;
  opacity: 0.9;
}

.deco-square {
  position: absolute;
  width: 80px;
  height: 80px;
  bottom: 100px;
  left: 100px;
  opacity: 0.9;
  transform: rotate(15deg);
}

.deco-triangle {
  position: absolute;
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 90px solid;
  top: 50%;
  right: 120px;
  opacity: 0.85;
  transform: translateY(-50%) rotate(-20deg);
}

.deco-line {
  position: absolute;
  width: 4px;
  height: 200px;
  top: 80px;
  left: 60px;
  opacity: 0.8;
  transform: rotate(30deg);
}

.red { background-color: #E1000F; border-color: #E1000F; }
.blue { background-color: #0033A0; border-color: #0033A0; }
.yellow { background-color: #FFD100; border-color: #FFD100; }
.black { background-color: #000; border-color: #000; }

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
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.97) 0%, rgba(250, 250, 250, 0.95) 100%);
  z-index: 1000;
  overflow-y: auto;
  padding: 40px 20px;
  transition: all 0.5s cubic-bezier(0.4, 0.0, 0.2, 1);
}

.overlay.compact {
  width: 380px;
  left: 0;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(248, 248, 248, 0.93));
  backdrop-filter: blur(10px);
  align-items: flex-start;
  padding: 30px;
  box-shadow: 8px 0 40px rgba(0, 0, 0, 0.15);
  border-right: 3px solid #E1000F;
}

/* Sidebar Header */
.sidebar-header {
  width: 100%;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 3px solid #000;
}

.sidebar-header h2 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  font-size: 32px;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin: 0 0 8px 0;
  color: #000;
}

.sidebar-subtitle {
  font-size: 12px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #666;
  margin: 0;
  font-weight: 500;
}

/* Content Wrapper */
.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.content-wrapper.compact {
  width: 100%;
  gap: 15px;
  margin-top: 20px;
}

/* Sidebar Selector */
.sidebar-selector {
  width: 100%;
  margin-top: 20px;
}

/* Projects Section */
.projects-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
}

/* Bauhaus Toggle Button */
.bauhaus-toggle {
  position: absolute;
  bottom: 30px;
  right: 30px;
  width: 70px;
  height: 70px;
  border: 3px solid #000;
  background: white;
  cursor: pointer;
  box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px;
  gap: 4px;
  overflow: hidden;
}

.bauhaus-toggle:hover {
  box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.3);
  transform: translate(-2px, -2px);
}

.bauhaus-toggle:active {
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.2);
  transform: translate(1px, 1px);
}

.overlay.compact .bauhaus-toggle {
  bottom: 30px;
  right: auto;
  left: 30px;
}

.toggle-icon {
  position: relative;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* Bauhaus geometric shapes in toggle */
.toggle-icon .square {
  position: absolute;
  width: 12px;
  height: 12px;
  background: #E1000F;
  top: 2px;
  left: 2px;
  transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
}

.toggle-icon .circle {
  position: absolute;
  width: 14px;
  height: 14px;
  background: #0033A0;
  border-radius: 50%;
  bottom: 2px;
  right: 2px;
  transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
}

.toggle-icon .triangle {
  position: absolute;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 14px solid #FFD100;
  bottom: 2px;
  left: 2px;
  transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
}

/* Animated state when compact */
.bauhaus-toggle.compact .square {
  transform: rotate(45deg) scale(1.1);
}

.bauhaus-toggle.compact .circle {
  transform: scale(1.2);
}

.bauhaus-toggle.compact .triangle {
  transform: rotate(180deg);
}

/* Toggle Label */
.toggle-label {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 8px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #000;
  text-align: center;
  line-height: 1.2;
  margin-top: 2px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .overlay.compact {
    width: 100%;
    border-right: none;
    border-bottom: 3px solid #E1000F;
  }

  .bauhaus-decorations {
    display: none;
  }

  .bauhaus-toggle {
    width: 60px;
    height: 60px;
    bottom: 20px;
    right: 20px;
  }

  .toggle-icon {
    width: 25px;
    height: 25px;
  }

  .toggle-label {
    font-size: 7px;
  }
}
</style>