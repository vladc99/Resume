<template>
  <div class="dock-window dock-advanced" :style="{ height: '100%', width: '100%' }">
    <Dock :model="items">
      <template #itemicon="{ item }">
        <div class="tooltip-wrapper">
          <i 
            :class="item.icon" 
            style="font-size: 300%" 
            @click="item.command"
            @mouseenter="showTooltip($event, item)"
            @mouseleave="hideTooltip"
          />
        </div>
      </template>
    </Dock>
    <div 
      v-if="activeTooltip" 
      class="custom-tooltip"
      :style="tooltipStyle"
    >
      {{ activeTooltip }}
    </div>
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
      items: [],
      activeTooltip: null,
      tooltipStyle: {}
    };
  },
  mounted() {
    this.items = utils.menus;
  },
  methods: {
    showTooltip(event, item) {
      this.activeTooltip = item.description || item.label;
      
      // Find the dock item container (parent element)
      const iconElement = event.currentTarget;
      let dockItem = iconElement.closest('.p-dock-item');
      
      // If we can't find the dock item, use the icon itself
      const targetElement = dockItem || iconElement;
      const rect = targetElement.getBoundingClientRect();
      
      // Position tooltip above the element, centered horizontally
      // Account for hover transform (translateY(-10px))
      const hoverOffset = 10; // The translateY on hover
      const tooltipOffset = 15; // Space between element and tooltip
      
      this.tooltipStyle = {
        top: `${rect.top - tooltipOffset - hoverOffset}px`,
        left: `${rect.left + rect.width / 2}px`,
        transform: 'translateX(-50%) translateY(-100%)'
      };
    },
    hideTooltip() {
      this.activeTooltip = null;
      this.hoveredItemIndex = null;
    }
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

.tooltip-wrapper {
  position: relative;
  display: inline-block;
}

.custom-tooltip {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.85);
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  pointer-events: none;
  z-index: 10000;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  animation: tooltipFadeIn 0.2s ease-out;
}

.custom-tooltip::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-top-color: rgba(0, 0, 0, 0.85);
}

@keyframes tooltipFadeIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-100%) translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(-100%) translateY(0);
  }
}

@media only screen and (max-width: 1200px) {
  .p-dock {
    display: none;
  }
}
</style>