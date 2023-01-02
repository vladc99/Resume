<template>
  <div class="mobileMenu">
    <SpeedDial
      :model="items"
      direction="up"
      type="liner"
      :radius="80"
      :mask="true"
    />
  </div>
</template>

<script>
import SpeedDial from "primevue/speeddial";
import utils from "../utils";

export default {
  name: "MobileMenuItem",
  components: {
    SpeedDial,
  },
  data() {
    return {
        items : []
    }
  },
  mounted () {
    this.items = utils.menus
  }
};
</script>

<style>

a{
    text-decoration: none;
}

.p-speeddial {
  position: fixed;
  bottom: 0;
  right: 0;
  padding-bottom: 5px;
  padding-right: 5px;
}

.mobileMenu {
  display: none;
}

@media only screen and (max-width: 1200px) {
  .mobileMenu {
    display: contents;
  }
}
</style>