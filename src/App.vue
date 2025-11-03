<template>
  <div>
    <NavBar v-if="!isMobile" />
    <MobileMenu v-else />
    <router-view />
  </div>
</template>

<script>
import MobileMenu from "./components/MobileMenu.vue";
import NavBar from "./components/NavBar.vue";

export default {
  name: "App",
  components: {
    NavBar,
    MobileMenu,
  },
  data() {
    return {
      isMobile: window.innerWidth <= 1200,
    };
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      this.isMobile = window.innerWidth <= 1200;
    }
  }
};
</script>

<style>
body {
  background-image: url("assets/bg 2.svg");
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
  background-attachment: fixed;
  max-height: 100%;
  padding-bottom: 98px;
}

@media only screen and (max-width: 1200px){
  body {
    padding-bottom: 10%;
  }
}

body, html {
    overflow: hidden !important;
    height: 100% !important;
    width: 100% !important;
    position: fixed !important;
}
pre {
    background: var(--color-bg);
    padding: 1em;
    border-radius: 4px;
    overflow-x: auto;
}
</style>