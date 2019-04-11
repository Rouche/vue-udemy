
import stocks from '../../data/stocks';

const state = {
    stocks: []
};

const mutations = {
    'SET_STOCKS'(state, stocks) {
        state.stocks = stocks;
    },
    'RNG_STOCKS'(state) {

    }
};

const actions = {
    buyStock: ({commit}, order) => { //Extract commit from context
        commit('BUY_STOCK', order);
    },
    initStocks: ({commit}) => { //Extract commit from context
        commit('SET_STOCKS', stocks);
    },
    randomizeStocks: ({commit}) => { //Extract commit from context
        commit('RNG_STOCKS');
    }
};

const getters = {
    stocks: state => {
        return state.stocks;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};