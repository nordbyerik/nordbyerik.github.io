<template>
  <div id="HeaderSection">
    <h1>Erik Nordby</h1>
    <p>enordby3@gatech.edu</p>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&display=swap');

#HeaderSection {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;
}

#HeaderSection h1 {
  font-family: 'Montserrat', sans-serif;
  font-size: 2em;
  color: black;
  margin: 0;
  font-weight: 400;
}

#HeaderSection p {
  margin: 0.5em;
  font-size: 1.2em;
  color: black;
  font-weight: 400;
  font-family: 'Courier Prime', monospace;
}
</style>
