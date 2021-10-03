import Vue from 'vue';
import VueRouter from 'vue-router';

import ViewLogin from '../views/view-login.vue';
import ViewIndex from '../views/view-index.vue';
import ViewWelcome from '../views/view-welcome.vue';
import ViewMyLaunch from '../views/view-my-launch.vue';
import ViewMyReceive from '../views/view-my-receive.vue';
import ViewEntrustQuery from '../views/view-entrust-query.vue';
import ViewEntrustApply from '../views/view-entrust-apply.vue';
import ViewEntrustLaunch from '../views/view-entrust-launch.vue';
import ViewEntrustReview from '../views/view-entrust-review.vue';
import ViewMenuAuthorize from '../views/view-menu-authorize.vue';
import ViewOperateAuthorize from '../views/view-operate-authorize.vue';
import ViewUsers from '../views/view-users.vue';
import ViewRoles from '../views/view-roles.vue';
import ViewLimites from '../views/view-limites.vue';
import ViewColorSetting from '../views/view-color-setting.vue';
import ViewSceneSetting from '../views/view-scene-setting.vue';
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
                    path: 'welcome',
                    component: ViewWelcome
                },
                {
                    path: 'my-launch',
                    component: ViewMyLaunch
                },
                {
                    path: 'my-receive',
                    component: ViewMyReceive
                },
                {
                    path: 'entrust-query',
                    component: ViewEntrustQuery
                },
                {
                    path: 'entrust-apply',
                    component: ViewEntrustApply
                },
                {
                    path: 'entrust-launch',
                    component: ViewEntrustLaunch
                },
                {
                    path: 'entrust-review',
                    component: ViewEntrustReview 
                },
                {
                    path: 'menu-authorize',
                    component: ViewMenuAuthorize
                },
                {
                    path: 'operate-authorize',
                    component: ViewOperateAuthorize
                },
                {
                    path: 'users',
                    component: ViewUsers
                },
                {
                    path: 'roles',
                    component: ViewRoles
                },
                {
                    path: 'limites',
                    component: ViewLimites
                },
                {
                    path: 'color-setting',
                    component: ViewColorSetting
                },
                {
                    path: 'scene-setting',
                    component: ViewSceneSetting
                }
            ]
        }
    ]
});