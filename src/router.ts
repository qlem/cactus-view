import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

Vue.use(Router);

const ifAuth = (to: any, from: any, next: any) => {
    if (!store.getters.isAuth) {
        next('/');
        return
    }
    next()
};

const ifNotAuth = (to: any, from: any, next: any) => {
    if (store.getters.isAuth) {
        next('/');
        return
    }
    next()
};

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import(/* webpackChunkName: "cactus" */ './views/Home.vue')
        },
        {
            path: '/about',
            name: 'about',
            component: () => import(/* webpackChunkName: "cactus" */ './views/About.vue')
        },
        {
            path: '/admin',
            name: 'admin',
            props: true,
            component: () => import(/* webpackChunkName: "cactus" */ './views/Admin.vue'),
            beforeEnter: ifAuth,
        },
        {
            path: '/login',
            name: 'login',
            component: () => import(/* webpackChunkName: "cactus" */ './views/Login.vue'),
            beforeEnter: ifNotAuth,
        }
    ]
})
