<template>
  <div id="app">
    <div class="overlay">Sorry! Updating this site</div>
    <HeaderSection @scrollTo="scrollToSection" />
    <LorenzAttractor />
  </div>
</template>

<script>
import HeaderSection from "./components/HeaderSection.vue";
import LorenzAttractor from "./components/LorenzAttractor.vue";

export default {
  name: "App",
  components: {
    HeaderSection,
    LorenzAttractor,
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
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&display=swap");
html,
body {
  font-family: "Playfair Display", sans-serif;
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
  background-color: #d2b48c; /* softer tan background */
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
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
