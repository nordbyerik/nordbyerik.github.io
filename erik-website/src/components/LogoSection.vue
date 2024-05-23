<template>
  <div class="social-icons" id="LogoSection">
    <a href="https://github.com/nordbyerik" target="_blank">
      <img src="@/assets/github.png" alt="GitHub" />
    </a>
    <a
      href="https://safe-mustang-98d.notion.site/Erik-s-Notes-781314fa142647b7b539c56af65a5c6e?pvs=4"
      target="_blank"
    >
      <img src="@/assets/notion.webp" alt="Notion" />
    </a>
    <a href="https://www.linkedin.com/in/erik-nordby/" target="_blank">
      <img src="@/assets/linkedin.webp" alt="LinkedIn" />
    </a>
    <a href="https://linktr.ee/eriknordby" target="_blank">
      <img src="@/assets/linktree.png" alt="Twitter" />
    </a>
    <a href="mailto:enordby3@gatech.edu"
      ><img src="@/assets/email.webp" alt="EMail"
    /></a>
  </div>
</template>
<style>
.social-icons a img {
  width: 40px; /* Adjust this value as needed */
  height: 40px; /* Adjust this value to maintain the aspect ratio or as desired */
  vertical-align: middle; /* Centers the icon vertically */
  margin-right: 10px; /* Adds spacing between icons, adjust as needed */
  color: black;
  decoration: none;
}

.social-icons {
  display: flex;
  justify-content: center; /* Centers the icons horizontally on the page */
  align-items: center; /* Centers the icons vertically */
  margin: 0.5em;
}
</style>
