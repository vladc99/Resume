import {createWebHistory, createRouter } from "vue-router";
import HomePage from "../views/HomePage";

const routes = [
    {
        path: '/',
        name: 'Home-Page',
        component: HomePage
    },
]

const router = createRouter({
    history: createWebHistory('/Resume/'),
    routes,
})

export default router;