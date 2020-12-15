import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios-auth';
import globalAxios from 'axios';

import router from './router';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        idToken: null,
        userId: null,
        user: null
    },
    mutations: {
        authUser: (state, userData) => {
            state.idToken = userData.token;
            state.userId = userData.userId;
        },
        storeUser: (state, user) => {
            state.user = user;
        },
        clear(state) {
            state.idToken = state.userId = state.user = null
        }
    },
    actions: {
        setLogoutTimer({ dispatch }, expirationTime) {
            setTimeout(() => {
                dispatch('logout');
            }, expirationTime * 1000);
        },
        signup({ commit, dispatch }, authData) {
            axios.post('/signupNewUser?key=AIzaSyAjHRwhS8hHvIxmJDkx7k5Nd_xab0pBX_0', {
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            }).then((response) => {
                console.log('Action signup: ' + response);
                commit('authUser', {
                    token: response.data.idToken,
                    userId: response.data.localId
                });
                authData.userId = response.data.localId;
                const now = new Date();
                const exp = new Date(now.getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('expires', exp);
                dispatch('storeUser', authData);
                dispatch('setLogoutTimer', response.data.expiresIn);
            }).catch(error => console.log('Action signup: ' + error));

        },
        tryAutoLogin({ commit }) {
            const token = localStorage.getItem('token');
            if (!token) {
                return;
            }
            const exp = new Date(localStorage.getItem('expires'));
            const now = new Date();
            if (now >= exp) {
                return;
            }
            const userId = localStorage.getItem('userId');
            commit('authUser', {
                token: token,
                userId: userId
            })
        },
        login({ commit, dispatch }, authData) {
            axios.post('/verifyPassword?key=AIzaSyAjHRwhS8hHvIxmJDkx7k5Nd_xab0pBX_0', {
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            }).then(res => {
                console.log('Action login: ', res)
                commit('authUser', {
                    token: res.data.idToken,
                    userId: res.data.localId
                });
                const now = new Date();
                const exp = new Date(now.getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('userId', res.data.localId);
                localStorage.setItem('expires', exp);
                dispatch('setLogoutTimer', res.data.expiresIn);
            }).catch(err => console.log('Action login: ' + err));

        },
        logout({ commit }) {
            commit('clear');
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('expires');
            router.replace('/');
        },
        storeUser: ({ commit, state }, userData) => {
            if (!state.idToken) {
                return;
            }
            globalAxios.post('/users.json?auth=' + state.idToken, userData)
                .then(res => {
                    console.log('Action storeUser: ' + res);
                })
                .catch(err => console.log('Action storeUser: ' + err));
        },
        fetchUser: ({ commit, state }) => {
            if (!state.idToken) {
                return;
            }
            globalAxios.get('/users.json?auth=' + state.idToken)
                .then(res => {
                    console.log(res);
                    const data = res.data;
                    const users = [];
                    for (let key in data) {
                        if (data[key].userId != state.userId) {
                            continue;
                        }
                        const user = data[key];
                        user.id = key;
                        users.push(user);
                    }
                    console.log('Action fetchUser: ' + users);
                    commit('storeUser', users[0]);
                })
                .catch(err => console.log('Action fetchUser: ' + err));

        }
    },
    getters: {
        user(state) {
            return state.user;
        },
        isAuth(state) {
            return state.idToken !== null;
        }
    }
})