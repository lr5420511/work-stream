<template>
    <el-container class="view-login">
        <el-aside width="34rem">
            <ser-scene :sceneHeight="leftHeight"
                       :scenes="$store.getters.scenes"
            ></ser-scene>
        </el-aside>
        <el-main class="view-login-right">
            <el-progress :show-text="false"
                         :stroke-width="1"
                         :percentage="progressValue"
            ></el-progress>
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
import { USER_REGULAR, PWD_REGULAR } from '../config';

export default {
    components: {
        'ser-scene': ServiceScene,
        'ser-login': ServiceLogin
    },
    data: () => ({
        leftHeight: 0,
        progressValue: 0,
        userRegular: USER_REGULAR,
        pwdRegular: PWD_REGULAR
    }),
    created: async function() {
        //临时模拟请求
        const temps = await new Promise(res => 
            setTimeout(() => res([
                './temp/images/1.jpg',
                './temp/images/2.jpg',
                './temp/images/3.jpg',
                './temp/images/4.jpg',
                './temp/images/5.jpg',
                './temp/images/6.jpg',
                './temp/images/7.jpg',
                './temp/images/8.jpg',
                './temp/images/9.jpg',
                './temp/images/10.jpg',
                './temp/images/11.jpg'
            ]), 4000)
        );
        this.$store.commit('writeScenes', { scenes: temps });
    },
    mounted: function() {
        this.leftHeight = document.documentElement.clientHeight;
    },
    methods: {
        commitLogin: async function(user) {
            if(!user) return;
            const timer = setInterval(() => ++this.progressValue - 99 || clearInterval(timer), 50);
            // 模拟请求
            const res = await new Promise(res => setTimeout(() => res(null), 8000));
            this.progressValue = 0;
            res || this.$message({
                type: 'error',
                message: '登入失败，请检查键入信息！'
            });
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
        margin-top: 160px;
    }
}
</style>