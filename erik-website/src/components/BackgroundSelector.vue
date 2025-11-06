<template>
  <div class="background-selector">
    <div class="selector-grid">
      <button
        v-for="(bg, index) in backgrounds"
        :key="bg.value"
        @click="selectBackground(bg.value)"
        :class="['bg-button', { 'active': selectedBackground === bg.value }]"
        :style="{ '--accent-color': getAccentColor(index) }"
      >
        <span class="bg-icon" :style="{ backgroundColor: getAccentColor(index) }"></span>
        <span class="bg-label">{{ bg.label }}</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "BackgroundSelector",
  data() {
    return {
      selectedBackground: "lorenz",
      backgrounds: [
        { value: "lorenz", label: "Lorenz" },
        { value: "boids", label: "Boids" },
        { value: "lsystem", label: "L-System" },
        { value: "gameoflife", label: "Life" },
        { value: "fractal", label: "Fractal" },
        { value: "slimemold", label: "Slime Mold" },
        { value: "antcolony", label: "Ant Colony" },
        { value: "reactiondiffusion", label: "Reaction" },
        { value: "voronoi", label: "Voronoi" },
        { value: "differentialgrowth", label: "Growth" },
        { value: "sandpile", label: "Sandpile" },
        { value: "prisonersdilemma", label: "Dilemma" },
        { value: "rockpaperscissors", label: "RPS" },
      ],
      accentColors: ["#E1000F", "#0033A0", "#FFD100"]
    };
  },
  methods: {
    selectBackground(value) {
      this.selectedBackground = value;
      this.$emit("background-changed", value);
    },
    getAccentColor(index) {
      return this.accentColors[index % this.accentColors.length];
    }
  },
};
</script>

<style scoped>
.background-selector {
  width: 100%;
}

.selector-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  width: 100%;
}

.bg-button {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: white;
  border: 2px solid #000;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1);
  font-family: 'Montserrat', sans-serif;
  text-align: left;
  position: relative;
  overflow: hidden;
}

.bg-button::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0;
  background: var(--accent-color);
  opacity: 0.1;
  transition: width 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
}

.bg-button:hover::before {
  width: 100%;
}

.bg-button:hover {
  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.15);
  transform: translate(-2px, -2px);
  border-color: var(--accent-color);
}

.bg-button.active {
  background: var(--accent-color);
  border-color: var(--accent-color);
  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.2);
}

.bg-button.active .bg-label {
  color: white;
  font-weight: 700;
}

.bg-button.active .bg-icon {
  background: white !important;
  border: 2px solid rgba(0, 0, 0, 0.2);
}

.bg-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  border: 2px solid rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.bg-label {
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #000;
  transition: all 0.2s ease;
  position: relative;
  z-index: 1;
}

/* Add geometric variety to icons based on position */
.bg-button:nth-child(3n+1) .bg-icon {
  border-radius: 50%;
}

.bg-button:nth-child(3n+2) .bg-icon {
  border-radius: 0;
  transform: rotate(45deg);
}

.bg-button:nth-child(3n+3) .bg-icon {
  border-radius: 0;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  transform: none;
}

.bg-button.active:nth-child(3n+2) .bg-icon {
  transform: rotate(45deg);
}

/* Responsive */
@media (max-width: 768px) {
  .bg-button {
    padding: 12px 14px;
  }

  .bg-label {
    font-size: 12px;
  }

  .bg-icon {
    width: 18px;
    height: 18px;
  }
}
</style>
