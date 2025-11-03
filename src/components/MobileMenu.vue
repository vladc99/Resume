<template>
  <div class="mobileMenu">
    <SpeedDial :model="items" direction="up" :radius="80" mask :style="{ position: 'absolute' }">
      <template #button="{ toggleCallback }">
        <Button variant="outlined" class="mobMenu" @click="toggleCallback">
          <span class="p-button-icon pi pi-plus"></span>
        </Button>
      </template>
      <template #item="{ item, toggleCallback }">
        <div
          class="flex flex-col items-center justify-between gap-2 p-2 border rounded border-surface-200 dark:border-surface-700 w-20 cursor-pointer"
          @click="toggleCallback">
          <span :class="item.icon" />
          <span>
            {{ item.label }}
          </span>
        </div>
      </template>
    </SpeedDial>
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
      items: []
    }
  },
  mounted() {
    this.items = utils.menus;
  }
};
</script>

<style>

.mobMenu {
  width: 100%;
  height: 100%;
  padding-bottom: 10%;
  padding-top: 10%;
  margin-bottom: 10%;
  margin-right: 10%;
  border-radius: 20px;
}

.p-speeddial-item {
  font-weight: bold;
  border-radius: 2rem;
  border-style: solid;
  background-color: var(--overlay-bg);
}

.mobileMenu {
  display: none;
}


@media only screen and (max-width: 1200px) {
  .mobileMenu {
    display: block;
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 9999;
    width: auto;
    height: auto;
    padding: 0;
  }

  .p-speeddial {
    bottom: 1%;
    right: .2%;
    z-index: 10000;
  }
}
</style>