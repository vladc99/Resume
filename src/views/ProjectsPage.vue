<template>
        <div class="projects-page">
                <div class="carousel-wrapper">
                        <Carousel :value="projects" :numVisible="1" :numScroll="1" circular :autoplayInterval="10000"
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
                                { id: 1, name: 'Chase the joke?', 
                                description: 'This mini project makes it so you need to chase the button to get the joke.', 
                                description2: '(Only works on desktop)',
                                url: '/test' },
                                { id: 2, name: 'Project Beta', description: 'Description for Project Beta.', url: 'https://example.com/beta' },
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

<style scoped>
.projects-page {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2em 1em;
        box-sizing: border-box;
        min-height: 100vh;
}

.project-card {
        margin-bottom: 10%;
        cursor: pointer;
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
        font-size: 150%;
        text-align: center;

}

.p-carousel-prev-button {
        width: 100%;
        height: 100%;
}

.carousel-content {
        display: flex;
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

        .carousel-wrapper>>>.p-carousel .p-carousel-prev {
                width: 32px !important;
                height: 32px !important;
                font-size: 1.1em !important;
                left: 4px !important;
                right: auto !important;
                top: 50% !important;
                transform: translateY(-50%) !important;
        }

        .carousel-wrapper>>>.p-carousel .p-carousel-next {
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
