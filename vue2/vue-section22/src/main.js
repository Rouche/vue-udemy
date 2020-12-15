import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';

import router from './router';
import store from './store';

import vuelidate from 'vuelidate';

Vue.use(vuelidate);

axios.defaults.baseURL = 'https://vue-update-b9ae9.firebaseio.com';
//axios.defaults.headers.common['Authorization'] = 'qwdqw';
axios.defaults.headers.get['Accepts'] = 'application/json';

const reqid = axios.interceptors.request.use((config) => {
    console.log('request int:' + config);
    return config;
});

const resid = axios.interceptors.response.use((res) => {
    console.log('response int:' + res);
    return res;
});

axios.interceptors.request.eject(reqid);
axios.interceptors.response.eject(resid);

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
