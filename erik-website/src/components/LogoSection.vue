<template>
  <div class="social-icons" id="LogoSection">
    <a href="https://github.com/nordbyerik" target="_blank" class="social-link">
      <img src="@/assets/github.png" alt="GitHub" />
    </a>
    <a
      href="https://safe-mustang-98d.notion.site/Erik-s-Notes-781314fa142647b7b539c56af65a5c6e?pvs=4"
      target="_blank"
      class="social-link"
    >
      <img src="@/assets/notion.webp" alt="Notion" />
    </a>
    <a href="https://www.linkedin.com/in/erik-nordby/" target="_blank" class="social-link">
      <img src="@/assets/linkedin.webp" alt="LinkedIn" />
    </a>
  </div>
</template>

<style scoped>
.social-icons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin: 20px 0;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  text-decoration: none;
  padding: 12px;
  background: white;
  border: 2px solid #000;
  transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
  box-sizing: border-box;
}

.social-link:hover {
  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.2);
  transform: translate(-2px, -2px);
}

.social-link img {
  width: 32px;
  height: 32px;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.social-link:hover img {
  transform: scale(1.1);
}

/* Compact mode adjustments */
:global(.overlay.compact) .social-icons {
  flex-direction: column;
  gap: 10px;
}

:global(.overlay.compact) .social-link {
  width: 50px;
  height: 50px;
  padding: 10px;
}

:global(.overlay.compact) .social-link img {
  width: 26px;
  height: 26px;
}

@media (max-width: 768px) {
  .social-link {
    width: 55px;
    height: 55px;
    padding: 10px;
  }

  .social-link img {
    width: 30px;
    height: 30px;
  }
}
</style>
