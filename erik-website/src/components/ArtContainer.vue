<template>
  <div class="art-container"></div>
</template>

<script>
import * as THREE from "three";

export default {
  name: "ArtContainer",
  mounted() {
    this.createTorus(this.$el);
  },
  methods: {
    createTorus(container) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 30;

      const renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);

      const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
      const material = new THREE.MeshBasicMaterial({ color: 0x0077ff });
      const torus = new THREE.Mesh(geometry, material);
      scene.add(torus);

      const animateTorus = () => {
        requestAnimationFrame(animateTorus);
        torus.rotation.x += 0.01;
        torus.rotation.y += 0.01;
        renderer.render(scene, camera);
      };

      animateTorus();
    },
  },
};
</script>

<style scoped>
.art-container {
  width: 100%;
  height: 300px;
}
</style>
