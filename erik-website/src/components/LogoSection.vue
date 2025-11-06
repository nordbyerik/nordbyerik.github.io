<template>
  <div class="social-icons" id="LogoSection">
    <a href="https://github.com/nordbyerik" target="_blank" class="social-link github">
      <div class="icon-square"></div>
      <span>GITHUB</span>
    </a>
    <a
      href="https://safe-mustang-98d.notion.site/Erik-s-Notes-781314fa142647b7b539c56af65a5c6e?pvs=4"
      target="_blank"
      class="social-link notion"
    >
      <div class="icon-circle"></div>
      <span>NOTION</span>
    </a>
    <a href="https://www.linkedin.com/in/erik-nordby/" target="_blank" class="social-link linkedin">
      <div class="icon-triangle"></div>
      <span>LINKEDIN</span>
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
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  padding: 12px 16px;
  background: white;
  border: 2px solid #000;
  transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
  min-width: 100px;
}

.social-link:hover {
  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.2);
  transform: translate(-2px, -2px);
}

.social-link span {
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #000;
}

/* Bauhaus geometric icons */
.icon-square {
  width: 28px;
  height: 28px;
  background: #E1000F;
  transition: transform 0.3s ease;
}

.icon-circle {
  width: 28px;
  height: 28px;
  background: #0033A0;
  border-radius: 50%;
  transition: transform 0.3s ease;
}

.icon-triangle {
  width: 0;
  height: 0;
  border-left: 16px solid transparent;
  border-right: 16px solid transparent;
  border-bottom: 28px solid #FFD100;
  transition: transform 0.3s ease;
}

.social-link:hover .icon-square {
  transform: rotate(45deg);
}

.social-link:hover .icon-circle {
  transform: scale(1.15);
}

.social-link:hover .icon-triangle {
  transform: translateY(-3px);
}

/* Compact mode adjustments */
:global(.overlay.compact) .social-icons {
  flex-direction: column;
  gap: 10px;
}

:global(.overlay.compact) .social-link {
  flex-direction: row;
  width: 100%;
  justify-content: flex-start;
  padding: 10px 14px;
  min-width: auto;
}

:global(.overlay.compact) .icon-square,
:global(.overlay.compact) .icon-circle,
:global(.overlay.compact) .icon-triangle {
  flex-shrink: 0;
}

:global(.overlay.compact) .social-link span {
  font-size: 10px;
}

@media (max-width: 768px) {
  .social-icons {
    flex-direction: column;
    gap: 10px;
  }

  .social-link {
    flex-direction: row;
    width: 100%;
    max-width: 250px;
    justify-content: flex-start;
  }

  .social-link span {
    font-size: 10px;
  }
}
</style>
