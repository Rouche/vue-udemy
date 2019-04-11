import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import { routes } from './routes';

// See passing props: https://github.com/vuejs/vue-router/tree/dev/examples/route-props

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

router.beforeEach( (to, from, next) => {
  console.log('Global before each to [' + to.path + '] from [' + from.path + ']');
  next();
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
