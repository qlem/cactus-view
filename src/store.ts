import Vue from 'vue';
import Vuex from 'vuex';
import { http } from "@/http/http";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: http.getToken(),
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
            state.status = 'success';
            state.token = token
        },
        AUTH_ERROR: state => {
            state.status = 'error'
        },
        AUTH_LOGOUT: state => {
            state.token = '';
        }
    },
    actions: {
        authRequest: async (context, user) => {
            try {
                context.commit('AUTH_REQUEST');
                const response = await http.instance.post('/identification', user);
                const token = response.data.token;
                http.setCookie(token, 10);
                context.commit('AUTH_SUCCESS', token);
            } catch (e) {
                context.commit('AUTH_ERROR', e);
                // http.deleteCookie()
            }
        },
        authLogout: context => {
            try {
                context.commit('AUTH_LOGOUT');
                http.deleteCookie()
            } catch (e) {
                // NOTHING BECAUSE I LOVE THE VOID
            }
        }
    },
});
