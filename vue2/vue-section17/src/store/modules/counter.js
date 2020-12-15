
import * as types from '../types';

const state = {
    counter: 0
}

const getters = {
    [types.DOUBLE_COUNTER]: (state) => {
        return state.counter * 2;
    },
    [types.CLICK_COUNTER]: (state) => {
        return state.counter + ' Clicked';
    }
    /*
    Example namespaced module foo getter
    someGetter (state, getters, rootState, rootGetters) {
        getters.someOtherGetter // -> 'foo/someOtherGetter'
        rootGetters.someOtherGetter // -> 'someOtherGetter'
    },
    */
}

const mutations = {
    increment: (state, payload) => {
        state.counter += payload || 1;
    },
    decrement: state => {
        state.counter--;
    }
}

const actions = {
    increment: ({ commit }, payload) => {
        commit('increment', payload);
    },
    decrement: ({ commit }) => { //Destructure the object and extract only the property
        commit('decrement');
    },
    asyncIncrement: (context, payload) => {
        setTimeout( () => {
            context.commit('increment', payload.by);                
        }, payload.time)
    }
    /* same
    someAction ({ dispatch, commit, getters, rootGetters }) {
        getters.someGetter // -> 'foo/someGetter'
        rootGetters.someGetter // -> 'someGetter'

        dispatch('someOtherAction') // -> 'foo/someOtherAction'
        dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'

        commit('someMutation') // -> 'foo/someMutation'
        commit('someMutation', null, { root: true }) // -> 'someMutation'
    },
    */
}

export default {
    state, getters, mutations, actions
}