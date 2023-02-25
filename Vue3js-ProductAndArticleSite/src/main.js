import { createApp } from 'vue';
import App from './App.vue';
import HomePage from './components/HomePage';
import ArtikelList from './components/ArtikelList';
import ArtikelPage from './components/ArtikelPage';
import ArtikelCreatePage from './components/ArtikelCreatePage';
import ProductList from './components/ProductList';
import ProductCreatePage from './components/ProductCreatePage';
import ProductViewSingle from './components/ProductViewSingle';
import InfoComponent from './components/InfoComponent';

import store from './store/store.js';

import { createRouter, createWebHashHistory } from "vue-router";

import '../public/assets/css/main.css'

const routes = [
    { path: '/', component: HomePage },
    { path: '/articles', component: ArtikelList },
    { path: '/articles/:id', component: ArtikelPage },
    { path: '/create/article', component: ArtikelCreatePage },
    { path: '/products', component: ProductList },
    { path: '/products/:id', component: ProductViewSingle },
    { path: '/products/create', component: ProductCreatePage },
    { path: '/info', component: InfoComponent }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes // short for `routes: routes`
});

createApp(App)
.use(store)
.use(router)
.mount('#app')