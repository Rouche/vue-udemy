
import Home from './components/Home.vue';
import Header from './components/Header.vue';
import Portfolio from './components/portfolio/Portfolio.vue'
import Stocks from './components/stocks/Stocks.vue'

export const routes = [
    { path: '/', name: 'home', 
        components: {
            default: Home,
            'header-top': Header 
        },
    },
    { path: '/portfolio', components: {
            default: Portfolio, 
            'header-top': Header
        },
        beforeEnter: (to, from, next) => {
            console.log('Inside portfolio');
            next();
        } 
    },
    { path: '/stocks', components: {
            default: Stocks, 
            'header-top': Header
        }
    },
    { path: '/redirect-me', redirect: { name: 'home'} },
    { path: '*', redirect: '/'}
];