import { createRouter, createWebHistory } from "vue-router";
import {store} from "@/store";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "Home",
            component: HomeView,
            meta: {
                layout: 'main',
                auth: true,
            }
        },
        {
            path: "/help",
            name: "Help",
            component: () => import("../views/HelpView.vue"),
            meta: {
                layout: 'main',
                auth: true,
            },
        },
        {
            path: "/request/:id",
            name: "Request",
            component: () => import("../views/RequestView.vue"),
            meta: {
                layout: 'main',
                auth: true,
            },
        },
        {
            path: "/auth",
            name: "Auth",
            component: () => import("../views/AuthView.vue"),
            meta: {
                layout: 'auth',
                auth: false,
            },
        },
    ],
    linkExactActiveClass: 'active',
    linkActiveClass: 'active',
});

router.beforeEach((to, from, next) => {
    const requireAuth = to.meta.auth;
    const isAuthenticated = store.getters['auth/isAuthenticated'];

    if (requireAuth && isAuthenticated) {
        next()
    } else if (requireAuth && !isAuthenticated) {
        next(`/auth?message=auth`);
    } else {
        next();
    }
});

export default router;
