<template>
  <section id="projects" class="section">
    <div class="text">
      <h2>Projects</h2>
      <ul>
        <li><strong>Project 1:</strong> Description of the first project.</li>
        <li><strong>Project 2:</strong> Description of the second project.</li>
        <li><strong>Project 3:</strong> Description of the third project.</li>
      </ul>
    </div>
    <div class="art">
      <GodelProof />
    </div>
  </section>
</template>

<script>
import GodelProof from "./GodelProof.vue";

export default {
  name: "ProjectsSection",
  components: {
    GodelProof,
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
