import { createWebHistory, createRouter } from "vue-router";
import HomePage from "../views/HomePage";

const routes = [
    {
        path: '/',
        name: 'Home-Page',
        component: HomePage
    },
    {
        path: '/project',
        name: 'Normal-Page',
        component: () => import('../views/NormalPage.vue')
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
    }
]

const router = createRouter({
    history: createWebHistory('/Resume/'),
    routes,
})

export default router;