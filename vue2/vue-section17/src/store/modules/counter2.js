
const state = {
    counter: 0
}

const getters = {
    doubleCounter: (state) => {
        return state.counter * 2;
    },
    clickCounter: (state) => {
        return state.counter + ' Clicked';
    }
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
}

export default {
    state, getters, mutations, actions,
    namespaced: true
}