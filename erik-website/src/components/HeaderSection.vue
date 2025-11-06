<template>
  <div id="HeaderSection">
    <div class="name-container">
      <h1>ERIK<br>NORDBY</h1>
      <div class="bauhaus-accent"></div>
    </div>
    <p class="email">enordby3@gatech.edu</p>
  </div>
</template>

<style scoped>
#HeaderSection {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 20px;
}

.name-container {
  position: relative;
  text-align: center;
}

#HeaderSection h1 {
  font-family: 'Montserrat', sans-serif;
  font-size: 3.5em;
  color: #000;
  margin: 0;
  font-weight: 800;
  letter-spacing: 3px;
  text-transform: uppercase;
  line-height: 0.95;
  position: relative;
}

.bauhaus-accent {
  position: absolute;
  width: 60px;
  height: 6px;
  background: #E1000F;
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.1);
}

.email {
  font-family: 'Courier New', monospace;
  font-size: 0.95em;
  color: #000;
  font-weight: 500;
  letter-spacing: 0.5px;
  background: white;
  padding: 10px 20px;
  border: 2px solid #000;
  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.1);
  margin: 0;
}

/* Compact mode adjustments */
:global(.overlay.compact) #HeaderSection h1 {
  font-size: 2em;
  letter-spacing: 2px;
}

:global(.overlay.compact) .bauhaus-accent {
  width: 40px;
  height: 4px;
  bottom: -8px;
}

:global(.overlay.compact) .email {
  font-size: 0.75em;
  padding: 8px 14px;
}

@media (max-width: 768px) {
  #HeaderSection h1 {
    font-size: 2.5em;
    letter-spacing: 2px;
  }

  .bauhaus-accent {
    width: 50px;
    height: 5px;
  }

  .email {
    font-size: 0.85em;
    padding: 8px 16px;
  }
}
</style>
