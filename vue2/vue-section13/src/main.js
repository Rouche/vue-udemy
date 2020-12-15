import Vue from 'vue'
import App from './App.vue'

Vue.filter('rt-lowercase', function ($value) {
    return $value.toLowerCase();
});

//Automatically added mixin everywhere
//new Vue() just below will also have the mixin.
Vue.mixin({
    created() {
        console.log('Global mixin');
    }
});

new Vue({
    el: '#app',
    render: h => h(App)
})
