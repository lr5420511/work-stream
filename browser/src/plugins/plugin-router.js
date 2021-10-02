import Vue from 'vue';
import VueRouter from 'vue-router';

import ViewLogin from '../views/view-login.vue';
import ViewIndex from '../views/view-index.vue';
import ViewProfile from '../views/view-profile.vue';
import ViewUser from '../views/view-user.vue';
import ViewRole from '../views/view-role.vue';
import ViewLimit from '../views/view-limit.vue';
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
                {
                    path: '',
                    component: null
                },
                {
                    path: 'profile',
                    component: ViewProfile
                },
                {
                    path: 'user',
                    component: ViewUser
                },
                {
                    path: 'role',
                    component: ViewRole
                },
                {
                    path: 'limit',
                    component: ViewLimit
                }
            ]
        }
    ]
});