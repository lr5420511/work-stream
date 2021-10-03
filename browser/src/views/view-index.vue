<template>
    <el-container class="view-index">
        <el-header class="view-index-top"
                   height="auto">
            <el-row>
                <el-col :span="22">
                    <el-image class="view-index-logo"
                              fit="fill"
                              :src="systemLogo"
                              @click.stop="isCollapse=!isCollapse">
                    </el-image>
                </el-col>
                <el-col :span="2">
                    <ser-self class="view-index-self"
                              size="1.4rem"
                              :name="$store.getters.realname"
                              :path="$store.getters.path"
                              :options="selfOptions"
                              @checked="checkOption">
                    </ser-self>
                </el-col>
            </el-row>
        </el-header>
        <el-container>
            <el-aside width="auto">
                <ser-navigator class="view-index-navigator"
                               minHeight="20rem"
                               :isCollapsed="isCollapse"
                               :defaultPath="$store.getters.defaultPath"
                               :options="$store.getters.operators"
                ></ser-navigator>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
        <el-footer class="view-index-bottom"
                   height="auto">
            <el-row>
                <el-col :span="24">
                    Copyright © Since 2021　All Rights Reserved.
                </el-col>
            </el-row>
        </el-footer>
    </el-container>
</template>

<script>
import LOGO from '../assets/images/logo.png';
import ServiceSelf from '../components/service-self.vue';
import ServiceNavigator from '../components/service-navigator.vue';
import { SIMPLY_VALIDATE_USER_URL } from '../config';

export default {
    components: {
        'ser-self': ServiceSelf,
        'ser-navigator': ServiceNavigator
    },
    data: () => ({
        systemLogo: LOGO,
        isCollapse: false,
        selfOptions: [
            { text: '上传头像', icon: 'el-icon-upload2' },
            { text: '修改密码', icon: 'el-icon-edit-outline' }
        ]
    }),
    created: async function() {
        // 模拟身份验证
        const account = [this.$store.getters.username, this.$store.getters.password],
            res = await new Promise(res => setTimeout(() => {
                const valid = account[0] === 'u826' && account[1] === 'LR$5420511';
                res(valid ? account : null);
            }, 1500));
        res || this.$router.replace('/login');
    },
    methods: {
        checkOption: function(cmd) {
            
        }
    }
};
</script>

<style lang="less" scoped>
@import url(../assets/less/variables.less);

.view-index {
    background-color: extract(@v-colors, 6);
    &-top {
        box-shadow: 0 0 2px 1px extract(@v-colors, 5);
        padding: 5px 20px;
    }
    &-bottom {
        background-color: extract(@v-colors, 2);
        color: extract(@v-colors, 6);
        padding: 50px 0;
        text-align: center;
        font-size: 12px;
    }
    &-logo {
        width: 42px;
        height: 42px;
        cursor: pointer;
    }
    &-self {
        float: right;
    }
    &-navigator {
        margin: 10px 0;
    }
}
</style>