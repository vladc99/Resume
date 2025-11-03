<template>
  <div class="dock-window dock-advanced" :style="{ height: '100%', width: '100%' }">
    <Dock :model="items">
      <template #itemicon="{ item }">
        <i :class="item.icon" style="font-size: 300%" @click="item.command" @mouseover="hover = true"
          @mouseleave="hover = false" />
        <Tooltip v-if="hover" :content="item.label" />
      </template>
    </Dock>
  </div>
</template>

<script>
import Dock from "primevue/dock";
import 'primeicons/primeicons.css';
import utils from "../utils";

export default {
  name: "header-comp",
  components: {
    Dock,
  },
  data() {
    return {
      hover: false,
      items: []
    };
  },
  mounted() {
    this.items = utils.menus;
  }
};
</script>

<style>
.p-dock {
  position: fixed;
  padding-bottom: .5%;
}

.p-dock-list-container,
.p-dock-list,
.p-dock-item,
.p-dock-item-content,
.p-dock-item-icon,
.p-dock-item-link {
  cursor: pointer !important;
}



@media only screen and (max-width: 1200px) {
  .p-dock {
    display: none;
  }
}
</style>