import Vue from 'vue';
import Vuex from 'vuex';
import { http } from "@/http/http";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: '',
        status: ''
    },
    getters: {
        isAuth: state => !!state.token,
        authStatus: state => state.status,
    },
    mutations: {
        AUTH_REQUEST: state => {
            state.status = 'loading'
        },
        AUTH_SUCCESS: (state, token) => {
            state.token = token;
            state.status = 'logged';
        },
        AUTH_ERROR: state => {
            state.token = '';
            state.status = 'error';
        },
        AUTH_LOGOUT: state => {
            state.token = '';
            state.status = 'not logged';
        }
    },
    actions: {
        initToken: (context, token) => {
            try {
                http.instance.defaults.headers.common['token'] = token;
                context.commit('AUTH_SUCCESS', token);
            } catch (e) {
                console.error('Cannot set token');
                console.error(e);
                context.commit('AUTH_ERROR', e);
            }
        },
        authRequest: async (context, user) => {
            try {
                context.commit('AUTH_REQUEST');
                const response = await http.instance.post('/identification', user);
                const token = response.data.token;
                http.setCookie(token, 10);
                http.instance.defaults.headers.common['token'] = token;
                context.commit('AUTH_SUCCESS', token);
            } catch (e) {
                console.error('Cannot login');
                console.error(e);
                context.commit('AUTH_ERROR', e);
            }
        },
        authLogout: context => {
            try {
                delete http.instance.defaults.headers.common['token'];
                http.deleteCookie();
                context.commit('AUTH_LOGOUT');
            } catch (e) {
                console.error('Logout error');
                console.error(e)
            }
        }
    },
});
