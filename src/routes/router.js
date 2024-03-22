import {createWebHistory, createRouter } from "vue-router";
import HomePage from "../views/HomePage";
import TablePage from "../views/TablePage";

const routes = [
    {
        path: '/',
        name: 'Home-Page',
        component: HomePage
    },
    {
        path: '/table',
        name: 'Table-Page',
        component: TablePage
    }
]

const router = createRouter({
    history: createWebHistory('/Resume/'),
    routes,
})

export default router;