<template>
  <Header />

  <router-view />
</template>

<script>
import Header from "./components/Header.vue";

export default {
  name: "App",
  components: {
    Header,
  },
};
</script>

<style>
body {
  background-image: url("assets/bg.svg");
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
</style>