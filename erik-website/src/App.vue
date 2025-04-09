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
    <LorenzAttractor class="attractor" />
  </div>
</template>

<script>
import HeaderSection from "./components/HeaderSection.vue";
import LorenzAttractor from "./components/LorenzAttractor.vue";
import LogoSection from "./components/LogoSection.vue";
import ProjectCards from "./components/ProjectCards.vue";

export default {
  name: "App",
  components: {
    HeaderSection,
    LorenzAttractor,
    LogoSection,
    ProjectCards
  },
  methods: {
    scrollToSection(id) {
      const section = document.getElementById(id);
      section.scrollIntoView({ behavior: "smooth" });
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