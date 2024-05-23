<template>
  <div id="app">
    <div class="overlay">
      <div>
        <HeaderSection @scrollTo="scrollToSection" />
      </div>
      <div>
        <LogoSection />
      </div>
    </div>
    <LorenzAttractor class="attractor" />
  </div>
</template>

<script>
import HeaderSection from "./components/HeaderSection.vue";
import LorenzAttractor from "./components/LorenzAttractor.vue";
import LogoSection from "./components/LogoSection.vue";

export default {
  name: "App",
  components: {
    HeaderSection,
    LorenzAttractor,
    LogoSection,
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
  background-color: rgb(242, 201, 255); /* softer tan background */
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
  background-color: rgba(
    255,
    255,
    255,
    0.8
  ); /* semi-transparent white overlay */
  color: black;
  font-size: 24px;
  z-index: 1000; /* ensures the overlay is above all other content */
}
</style>
