import { createApp } from 'vue';
import App from './App.vue';
import ArtikelList from './components/ArtikelList';
import ContactList from './components/ContactList';

import {createRouter, createWebHashHistory} from "vue-router";

import '../public/assets/css/main.css'


const Home = { template: '<div>Home</div>' }

const routes = [
    { path: '/', component: Home },
    { path: '/ArtikelList', component: ArtikelList },
    { path: '/ContactList', component: ContactList }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
});

createApp(App)
.use(router)
.mount('#app')

