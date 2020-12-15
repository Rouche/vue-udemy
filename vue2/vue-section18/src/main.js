import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import { routes } from './routes';

import store from './store/store'

Vue.use(VueRouter);

const router = new VueRouter({
  routes,  //shortcut for routes: routes
  mode: 'history', //default hash
  scrollBehavior (to, from, savedPosition) {
    if(savedPosition) {
      return savedPosition;
    }
    if(to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0};
  }
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
