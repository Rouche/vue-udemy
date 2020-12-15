

const state = {
}

const getters = {
}

const mutations = {
    xxx: (state, payload) => {
    },
}

const actions = {
    xxx: ({ commit }, payload) => {
        commit('xxx', payload);
    },
    asyncXxx: (context, payload) => {
        setTimeout( () => {
            context.commit('xxx', payload);
        }, 10)
    }
}

export default {
    state, getters, mutations, actions
}