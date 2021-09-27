import 'babel-polyfill';
import 'fetch-polyfill';
import Vue from 'vue';
import store from './plugins/plugin-vuex/plugin-vuex';
import router from './plugins/plugin-router';
import './plugins/plugin-component';
import AppRoot from './app.vue';

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(AppRoot)
});