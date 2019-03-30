import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import AddEditOne from '@/components/AddEditOne.vue'
import EditMany from '@/components/EditMany.vue'

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
            path: '/contact',
            name: 'contact',
            component: () => import(/* webpackChunkName: "cactus" */ './views/Contact.vue')
        },
        {
            path: '/admin',
            name: 'admin',
            props: true,
            component: () => import(/* webpackChunkName: "cactus" */ './views/Admin.vue'),
            children: [
                {
                    path: 'one',
                    component: AddEditOne,
                    props: true
                },
                {
                    path: 'many',
                    component: EditMany
                }
            ],
            beforeEnter: ifAuth
        },
        {
            path: '/login',
            name: 'login',
            component: () => import(/* webpackChunkName: "cactus" */ './views/Login.vue'),
            beforeEnter: ifNotAuth,
        }
    ]
})
