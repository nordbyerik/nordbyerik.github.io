<template>
  <div id="HeaderSection">
    <h1>Erik Nordby</h1>
    <p>enordby3@gatech.edu</p>
  </div>
</template>

<style scoped>
#HeaderSection {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;
  margin-bottom: 10px; /* Add some spacing */
}

#HeaderSection h1 {
  font-family: 'Montserrat', sans-serif;
  font-size: 2.2em; /* Slightly reduced for elegance */
  color: black;
  margin: 0;
  font-weight: 700;
  letter-spacing: -0.5px; /* Tighter, more modern spacing */
}

#HeaderSection p {
  margin: 0.4em; /* Reduced margin */
  font-size: 1em; /* Reduced for subtlety */
  color: #333; /* Slightly softer than pure black */
  font-weight: 400;
  font-family: 'Montserrat', sans-serif;
}
</style>
