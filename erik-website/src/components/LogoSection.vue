<template>
  <div class="social-icons" id="LogoSection">
    <a href="https://github.com/yourusername" target="_blank">
      <img src="@/assets/github.png" alt="GitHub" />
    </a>
    <a href="https://www.notion.so/yourpage" target="_blank">
      <img src="@/assets/notion.webp" alt="Notion" />
    </a>
    <a href="https://www.linkedin.com/in/yourusername" target="_blank">
      <img src="@/assets/linkedin.webp" alt="LinkedIn" />
    </a>
  </div>
</template>

<style>
.social-icons a img {
  width: 40px; /* Adjust this value as needed */
  height: 40px; /* Adjust this value to maintain the aspect ratio or as desired */
  vertical-align: middle; /* Centers the icon vertically */
  margin-right: 10px; /* Adds spacing between icons, adjust as needed */
}

.social-icons {
  display: flex;
  justify-content: center; /* Centers the icons horizontally on the page */
  align-items: center; /* Centers the icons vertically */
  margin: 0.5em;
}
</style>
