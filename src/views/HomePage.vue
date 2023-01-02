<template>
  <div class="card card-container">
    <div class="flex justify-content-center m-2">
      <img :src="imgPath" alt="me" />
    </div>
    <div
      class="flex justify-content-center m-2 text"
      style="flex-direction: column"
    >
      <div class="flex justify-content-center">
        <p class="hello">Hi, I'm Vlad</p>
      </div>
      <div class="flex justify-content-center">
        <p class="me">Junior/mid developer</p>
      </div>
    </div>
    <div class="flex align-items-center justify-content-center m-2 timeline">
      <Timeline :value="timeLine" align="alternate" class="customized-timeline">
        <template #marker="slotProps">
          <span class="custom-marker shadow-2">
            <i :class="slotProps.item.icon" />
          </span>
        </template>
        <template #content="slotProps">
          <p style="font-weight: bold; margin: 0px">
            {{ slotProps.item.name }}
          </p>
          <p>{{ slotProps.item.description }}</p>
        </template>

        <template #connector>
          <div
            class="p-timeline-event-connector"
            style="width: 3px; background-color: white; opacity: 0.7"
          />
        </template>
      </Timeline>
    </div>
  </div>
  <div>
    <MobileMenu />
  </div>
</template>

<script>
import Timeline from "primevue/timeline";
import MobileMenu from "../components/MobileMenu.vue";

export default {
  name: "HomePage",
  components: {
    Timeline,
    MobileMenu,
  },
  data() {
    return {
      imgPath: require("../assets/me.jpg"),
      timeLine: [
        {
          name: "Sheridan College",
          description: "2018-2020",
          icon: "pi pi-briefcase",
        },
        {
          name: "TD Bank",
          description: "Jan 2020-Dec 2020",
          icon: "pi pi-building",
        },
        {
          name: "Sheridan College",
          description: "Finished in 2021",
          icon: "pi pi-briefcase",
        },
        {
          name: "Scotiabank",
          description: "Jul 2021-Present",
          icon: "pi pi-building",
        },
      ],
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Caveat&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Cinzel&display=swap");

img {
  border-radius: 50%;
  width: 350px;
  height: 350px;
}

.hello {
  font-family: "Caveat", cursive;
  font-size: 3em;
}

.me {
  font-family: "Cinzel", serif;
  font-size: 2em;
}

.text,
p {
  margin-top: 5%;
  margin-bottom: 0%;
}

.text {
  padding-left: 1%;
}

.card {
  margin-top: 10%;
  flex-direction: row;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  align-self: auto;
}

.timeline {
  min-width: 20%;
}

i {
  font-size: 140%;
}

@media only screen and (max-width: 1200px) {
  .pi-arrow-left {
    position: fixed;
    right: 1px;
    top: 50%;
    background-color: transparent;
    font-size: 150%;
    border: none;
    color: white;
  }

  .p-chip {
    position: fixed;
    right: 1px;
    top: 50%;
  }

  .card {
    flex-direction: column;
    display: block;
  }

  p {
    margin-top: 1%;
    margin-bottom: 1%;
  }
  .timeline {
    min-width: 0%;
    padding-top: 5%;
  }

  img {
    width: 250px;
    height: 250px;
  }
}

@media only screen and (max-width: 405px) {
  .me {
    text-align: center;
  }
  .card {
    display: block;
  }
  img {
    width: 200px;
    height: 200px;
  }
}
</style>