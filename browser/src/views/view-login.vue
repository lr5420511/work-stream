<template>
    <el-container class="view-login">
        <el-aside width="34rem">
            <ser-scene :sceneHeight="leftHeight"
                       :scenes="$store.getters.scenes"
            ></ser-scene>
        </el-aside>
        <el-main class="view-login-right">
            <ser-progress :value="progressValue"
            ></ser-progress>
            <ser-login class="view-login-auth"
                       :nameRegular="userRegular"
                       :pwdRegular="pwdRegular"
                       @validated="commitLogin"
            ></ser-login>
        </el-main>
    </el-container>
</template>

<script>
import ServiceScene from '../components/service-scene.vue';
import ServiceLogin from '../components/service-login.vue';
import ServiceProgress from '../components/service-progress.vue';
import { USER_REGULAR, PWD_REGULAR, GLOBAL_SETTINGS_URL, COMPLEX_VALIDATE_USER_URL } from '../config';

export default {
    components: {
        'ser-scene': ServiceScene,
        'ser-login': ServiceLogin,
        'ser-progress': ServiceProgress
    },
    data: () => ({
        leftHeight: 0,
        progressValue: 0,
        userRegular: USER_REGULAR,
        pwdRegular: PWD_REGULAR
    }),
    created: async function() {
        const { scenes } = this.$store.getters;
        if(scenes.some(scene => scene)) return;
        let res = await fetch(GLOBAL_SETTINGS_URL);
        res = await res.json();
        if(!res.error) {
            const { color, scenes } = res.result;
            this.$store.commit('writeColor', { color });
            this.$store.commit('writeScenes', { scenes });
            return;
        }
        throw new Error(res.result);
    },
    mounted: function() {
        this.leftHeight = document.documentElement.clientHeight;
    },
    methods: {
        commitLogin: async function(user) {
            if(!user) return;
            this.progressValue = 99;
            // 模拟请求
            const res = await new Promise(res => setTimeout(() => {
                const valid = user.username === 'u826' && user.password === 'LR$5420511';
                res(valid ? {
                    username: 'u826',
                    password: 'LR$5420511',
                    realname: '廖睿',
                    path: './temp/images/me.jpg',
                    operators: [
                        {
                            icon: 'el-icon-s-order',
                            title: '委托管理',
                            children: [
                                { title: '委托申请', path: '/index/entrust-apply' },
                                { title: '委托发起', path: '/index/entrust-launch' },
                                { title: '委托审核', path: '/index/entrust-review' }
                            ]
                        },
                        {
                            icon: 'el-icon-s-grid',
                            title: '角色授权',
                            children: [
                                { title: '授权导航', path: '/index/menu-authorize' },
                                { title: '授权操作', path: '/index/operate-authorize' }
                            ]
                        },
                        {
                            icon: 'el-icon-s-management',
                            title: '字典管理',
                            children: [
                                { title: '用户管理', path: '/index/users' },
                                { title: '角色管理', path: '/index/roles' },
                                { title: '权限管理', path: '/index/limites' }
                            ]
                        },
                        { 
                            icon: 'el-icon-s-tools', 
                            title: '系统设置',
                            children: [
                                { title: '颜色风格', path: '/index/color-setting' },
                                { title: '场景编辑', path: '/index/scene-setting' }
                            ] 
                        },
                        {
                            icon: 'el-icon-s-home',
                            title: '欢迎您',
                            path: '/index/welcome'
                        },
                        {
                            icon: 'el-icon-s-promotion',
                            title: '发起的委托',
                            path: '/index/my-launch'
                        },
                        {
                            icon: 'el-icon-s-ticket',
                            title: '接收的委托',
                            path: '/index/my-receive'
                        },
                        {
                            icon: 'el-icon-search',
                            title: '委托查询',
                            path: '/index/entrust-query'
                        }
                    ]
                } : null);
            }, 4000));
            res || this.$message({ type: 'error', message: '账户信息验证失败，请检查！' });
            if(res) {
                this.$store.commit('writeUser', res);
                this.$router.push('/index');
            }
            this.progressValue = 0;
        }
    }
};
</script>

<style lang="less" scoped>
@import url(../assets/less/variables.less);

.view-login {
    background-color: extract(@v-colors, 6);
    &-right {
        padding: 0;
    }
    &-auth {
        margin: 150px 20px 0 20px;
    }
}
</style>