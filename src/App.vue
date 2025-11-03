<template>
  <div class="stars"></div>
  <div class="shooting-star"></div>
  <div class="shooting-star"></div>
  <div class="shooting-star"></div>
  <div class="shooting-star"></div>
  <div class="shooting-star"></div>
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