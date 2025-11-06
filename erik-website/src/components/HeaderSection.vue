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
}

#HeaderSection h1 {
  font-family: 'Montserrat', sans-serif;
  font-size: 2.5em;
  color: black;
  margin: 0;
  font-weight: 500; /* Relaxed from 700 for a lighter, modern feel */
  letter-spacing: -0.5px; /* Tighter tracking for contemporary look */
}

#HeaderSection p {
  margin: 0.5em;
  font-size: 1.1em;
  color: #333; /* Slightly softer black for subtle contrast */
  font-weight: 400;
  font-family: 'Courier New', 'Monaco', 'Consolas', monospace; /* Monospaced for techy aesthetic */
  letter-spacing: 0.5px; /* Breathing room for monospace */
  background: rgba(0, 0, 0, 0.04); /* Subtle code-block style background */
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.08);
}
</style>
