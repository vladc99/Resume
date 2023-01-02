<template>
  <Dock :model="items">
    <template #icon="{ item }">
      <i
        :class="item.icon"
        style="font-size: 300% !important"
        @click="item.command"
      />
    </template>
  </Dock>
</template>

<script>
import Dock from "primevue/dock";
import utils from "../utils";

export default {
  name: "header-comp",
  components: {
    Dock,
  },
  data() {
    return {
      items: [],
    };
  },
  mounted () {
    this.items = utils.menus
  }
};
</script>

<style>
.p-dock {
  position: fixed;
}

@media only screen and (max-width: 1200px) {
  .p-dock {
    display: none;
  }
}
</style>