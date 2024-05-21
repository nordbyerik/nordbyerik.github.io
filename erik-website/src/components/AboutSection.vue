<template>
  <section id="about" class="section">
    <div class="text">
      <h2>About Me</h2>
      <p>
        Hello! I'm Erik Nordby, a software engineer with a passion for AI and
        machine learning.
      </p>
      <p>
        I am currently pursuing a Master's in Deep Learning and considering a
        PhD related to AI Safety.
      </p>
      <p>
        With extensive experience in software development and a keen interest in
        cutting-edge technology, I am eager to contribute to innovative projects
        and explore new opportunities.
      </p>
    </div>
    <div class="art">
      <ArtContainer />
    </div>
  </section>
</template>

<script>
import ArtContainer from "./ArtContainer.vue";

export default {
  name: "AboutSection",
  components: {
    ArtContainer,
  },
};
</script>

<style scoped>
.section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 50px 0;
}

.text {
  width: 50%;
}

.art {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
