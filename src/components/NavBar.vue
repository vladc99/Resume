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

/* Hover animation for dock items */
.p-dock-item {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease;
}

.p-dock-item:hover {
  transform: translateY(-10px) scale(1.15);
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3)) brightness(1.2);
}

.p-dock-item-icon {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), 
              color 0.3s ease;
  position: relative;
}

/* Add a subtle pulse animation on hover */
@keyframes pulse-glow {
  0%, 100% {
    filter: drop-shadow(0 0 10px rgba(100, 150, 255, 0.5)) 
            drop-shadow(0 0 20px rgba(100, 150, 255, 0.3));
  }
  50% {
    filter: drop-shadow(0 0 20px rgba(100, 150, 255, 0.8)) 
            drop-shadow(0 0 30px rgba(100, 150, 255, 0.5))
            drop-shadow(0 0 40px rgba(100, 150, 255, 0.3));
  }
}

.p-dock-item:hover .p-dock-item-icon {
  transform: rotate(5deg) scale(1.1);
  animation: pulse-glow 1.5s ease-in-out infinite;
}

/* Smooth transition for all dock item content */
.p-dock-item-content {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@media only screen and (max-width: 1200px) {
  .p-dock {
    display: none;
  }
}
</style>