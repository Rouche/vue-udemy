import Vue from 'vue';
import Vuex from 'vuex';
import counter from './modules/counter'
import counter2 from './modules/counter2'

import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        counter: 0,
        value: 0
    },
    getters,
    mutations,
    actions,
    modules: {
        counter,
        counter2
    }
});