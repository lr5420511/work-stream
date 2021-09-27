import Vue from 'vue';
import VueRouter from 'vue-router';

import ViewLogin from '../views/view-login.vue';
import ViewIndex from '../views/view-index.vue';
// import more views to here!

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'hash',
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: ViewLogin
        },
        {
            path: '/index',
            component: ViewIndex,
            children: [
                
            ]
        }
    ]
});