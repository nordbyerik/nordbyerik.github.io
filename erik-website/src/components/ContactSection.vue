<template>
  <section id="contact" class="section">
    <div class="text">
      <h2>Contact</h2>
      <p>Feel free to reach out to me through the following channels:</p>
      <ul>
        <li>
          Email:
          <a href="mailto:erik.nordby@example.com">erik.nordby@example.com</a>
        </li>
        <li>
          LinkedIn:
          <a href="https://www.linkedin.com/in/eriknordby" target="_blank"
            >linkedin.com/in/eriknordby</a
          >
        </li>
        <li>
          GitHub:
          <a href="https://github.com/eriknordby" target="_blank"
            >github.com/eriknordby</a
          >
        </li>
      </ul>
    </div>
    <div class="art">
      <ArtContainer />
    </div>
  </section>
</template>

<script>
import ArtContainer from "./ArtContainer.vue";

export default {
  name: "ContactSection",
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
