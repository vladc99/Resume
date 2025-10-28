<template>
        <div class="projects-page">
                <div class="projects-title-wrapper">
                        <h1>Projects</h1>
                </div>
                <div class="carousel-wrapper">
                        <Carousel :value="projects" :numVisible="1" :numScroll="1" circular :autoplayInterval="5000" contentClass="carousel-content">
                                <template #item="{ data }">
                                        <div class="project-card" @click="redirectTo(data.url)">
                                                <h2>{{ data.name }}</h2>
                                                <p>{{ data.description }}</p>
                                                <Button label="View Project" class="project-btn" />
                                        </div>
                                </template>
                        </Carousel>
                </div>
        </div>
</template>

<script>
import Carousel from 'primevue/carousel';
import Button from 'primevue/button';

export default {
        name: 'ProjectsPage',
        components: {
                Carousel,
                Button
        },
        data() {
                return {
                        projects: [
                                { id: 1, name: 'Chase the joke?', description: 'This mini project makes it so you need to chase the button to get the joke.', url: '/test' },
                                { id: 2, name: 'Project Beta', description: 'Description for Project Beta.', url: 'https://example.com/beta' },
                                // Add more projects as needed
                        ]
                };
        },
        methods: {
                redirectTo(url) {
                        window.location.href = url;
                }
        }
};
</script>

<style scoped>
.projects-page {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2em 1em;
        box-sizing: border-box;
        min-height: 100vh;
}

.carousel-wrapper {
        flex: 1;
        width: 100vw;
        max-width: 1080px;
        min-height: 480px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        margin: 0 auto;
}
.carousel-content {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 480px;
        width: 100%;
}
@media only screen and (max-width: 600px) {
    .projects-title-wrapper h1 {
        font-size: 1.3em;
        margin-top: 2vw;
        margin-bottom: 2vw;
    }
    .carousel-wrapper {
        max-width: 100vw;
        min-height: 320px;
        padding: 0;
        position: relative;
        margin: 0 auto;
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .carousel-content {
        min-height: 0;
        width: 100vw;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .project-card {
        max-width: 96vw;
        min-height: 0;
        padding: 1em 0.3em;
        font-size: 0.95em;
        border-radius: 12px;
    }
    .project-btn {
        padding: 0.5em 1em;
        font-size: 0.95em;
        margin-top: 0.7em;
    }
    .carousel-wrapper >>> .p-carousel .p-carousel-prev {
        width: 32px !important;
        height: 32px !important;
        font-size: 1.1em !important;
        left: 4px !important;
        right: auto !important;
        top: 50% !important;
        transform: translateY(-50%) !important;
    }
    .carousel-wrapper >>> .p-carousel .p-carousel-next {
        width: 32px !important;
        height: 32px !important;
        font-size: 1.1em !important;
        right: 4px !important;
        left: auto !important;
        top: 50% !important;
        transform: translateY(-50%) !important;
    }
}
</style>
