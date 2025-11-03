<template>
        <div class="projects-page">
                <div class="carousel-wrapper">
                        <Carousel :value="projects" :numVisible="1" :numScroll="1" circular :autoplayInterval="5000"
                                contentClass="carousel-content">
                                <template #item="{ data }">
                                        <div class="project-card" @click="redirectTo(data.url)">
                                                <h2>{{ data.name }}</h2>
                                                <p>{{ data.description }}</p>
                                                <p v-if="data.description2"> {{ data.description2 }}</p>
                                        </div>
                                </template>
                        </Carousel>
                </div>
        </div>
</template>

<script>
import Carousel from 'primevue/carousel';

export default {
        name: 'ProjectsPage',
        components: {
                Carousel,
        },
        data() {
                return {
                        projects: [
                                {
                                        id: 1, name: 'Chase the joke?',
                                        description: 'This mini project makes it so you need to chase the button to get the joke.',
                                        description2: '(Only works on desktop)',
                                        url: '/test'
                                },
                                {
                                        id: 2,
                                        name: 'Guess the programming language',
                                        description: "You'll be shown a snippet and your job is to guess the programming language",
                                        url: '/guess'
                                }, 
                                {
                                        id: 3,
                                        name: 'Working calculator',
                                        description: "In case your calculator doesn't work",
                                        url: '/calculator'
                                },
                                {
                                        id: 4,
                                        name: 'Wordle',
                                        description: "Wordle but with programming words",
                                        url: '/wordle'
                                },
                                // Add more projects as needed
                        ]
                };
        },
        methods: {
                redirectTo(url) {
                        if (/^https?:\/\//i.test(url)) {
                                window.open(url, '_blank');
                                return;
                        }
                        this.$router.push(url);
                }
        }
};
</script>

<style>
.projects-page {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        overflow-x: hidden;
}

body,
html {
        overflow-y: hidden !important;
}

.project-card {
        margin-bottom: auto;
        cursor: pointer;
        padding-bottom: 10vh;
}

.carousel-wrapper {
        text-align: center;
        font-size: 100%;
        margin: 5vh auto;
        width: 100%;
        max-width: 800px;
        padding-left: 16px;
        padding-right: 16px;
}

/* Ensure PrimeVue carousel content cannot overflow horizontally on small screens */
.carousel-content {
        max-width: 100%;
        overflow: hidden;
}
</style>
