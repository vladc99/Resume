import { createWebHistory, createRouter } from "vue-router";
import HomePage from "../views/HomePage.vue";

const routes = [
    {
        path: '/',
        name: 'Home-Page',
        component: HomePage
    },
    {
        path: '/calculator',
        name: 'Calculator-Page',
        component: () => import('../views/Calculator.vue')
    },
    {
        path: '/test',
        name: 'Test-Page',
        component: () => import('../views/TestPage.vue')
    },
    {
        path: '/projects',
        name: 'Projects-Page',
        component: () => import('../views/ProjectsPage.vue')
    },
    {
        path: '/guess',
        name: 'Guess-Page',
        component: () => import('../views/Guess.vue')
    },
    {
        path: '/wordle',
        name: 'Wordle-Page',
        component: () => import('../views/Wordle.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;