
/**
 * @see https://github.com/vuejs/vuex/releases/tag/v2.1.0
 * for auto namespacing modules with vuex
 */

import Vue from 'vue'
import App from './App.vue'

import { store } from './store/store';

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
