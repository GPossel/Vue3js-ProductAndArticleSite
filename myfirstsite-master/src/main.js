import { createApp } from 'vue';
import App from './App.vue';
import ArtikelList from './components/ArtikelList';
import ArtikelPage from './components/ArtikelPage';
import ArtikelCreatePage from './components/ArtikelCreatePage';
import InfoComponent from './components/InfoComponent';

import store from './store/store.js';

import { createRouter, createWebHashHistory } from "vue-router";

import '../public/assets/css/main.css'

const Home = { template: '<div>Home</div>' }

const routes = [
    { path: '/', component: Home },
    { path: '/articles', component: ArtikelList },
    { path: '/articles/:id', component: ArtikelPage },
    { path: '/create/article', component: ArtikelCreatePage },
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