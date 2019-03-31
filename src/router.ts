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
    linkActiveClass: 'active',
    linkExactActiveClass: 'exact-active',
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
            path: '/contact',
            name: 'contact',
            component: () => import(/* webpackChunkName: "cactus" */ './views/Contact.vue')
        },
        {
            path: '/admin',
            name:'admin',
            component: () => import(/* webpackChunkName: "cactus" */ './views/Admin.vue'),
            // props: true,
            children: [
                {
                    path: 'one',
                    name: 'addEditOne',
                    component: () => import(/* webpackChunkName: "cactus" */ './components/AddEditOne.vue'),
                    props: true
                },
                {
                    path: 'many',
                    name: 'editMany',
                    component: () => import(/* webpackChunkName: "cactus" */ './components/EditMany.vue'),
                }
            ],
            // beforeEnter: ifAuth
        },
        {
            path: '/login',
            name: 'login',
            component: () => import(/* webpackChunkName: "cactus" */ './views/Login.vue'),
            beforeEnter: ifNotAuth,
        },
        {
            path: '/*',
            redirect: { name: 'home' }
        }
    ]
})
