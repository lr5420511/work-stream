<template>
    <el-container class="view-index">
        <el-header class="view-index-top"
                   height="auto">
            <el-row>
                <el-col :span="22">
                    <el-image class="view-index-logo"
                              fit="fill"
                              :src="systemLogo"
                              @click.stop="isSimply=!isSimply">
                    </el-image>
                </el-col>
                <el-col :span="2">
                    <ser-self size="1.4rem"
                              :options="selfOptions"
                              @checked="checkOption">
                    </ser-self>
                </el-col>
            </el-row>
        </el-header>
        <el-container>
            <el-aside width="auto">
                <div style="width:300px;height:460px;border-right:solid 1px #ccc;"></div>
            </el-aside>
            <el-main>
                
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
import { COMPLEX_VALIDATE_USER_URL } from '../config';

export default {
    components: {
        'ser-self': ServiceSelf,
        'ser-navigator': ServiceNavigator
    },
    data: () => ({
        systemLogo: LOGO,
        isSimply: true,
        selfOptions: [
            { text: '上传头像', icon: 'el-icon-upload2' },
            { text: '修改密码', icon: 'el-icon-edit-outline' }
        ]
    }),
    created: async function() {

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
        padding: 10px;
    }
    &-bottom {
        background-color: extract(@v-colors, 3);
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
}
</style>