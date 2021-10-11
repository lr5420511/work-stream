<template>
    <el-container>
        <el-header class="view-color-setting-tip"
                   height="auto">
            <el-alert title="页面描述"
                      description="该页面提供系统页头颜色风格的编辑功能"
                      :closable="false"
                      show-icon>
            </el-alert>
        </el-header>
        <el-main class="view-color-setting-content">
            <ser-color :color="$store.getters.color"
                   @checked="commitColor">
            </ser-color>
        </el-main>
    </el-container>
</template>

<script>
import ServiceColor from '../components/service-color.vue';
import { EDIT_SETTING_COLOR_URL } from '../config';

export default {
    components: {
        'ser-color': ServiceColor
    },
    methods: {
        commitColor: async function(color) {
            const { username, password } = this.$store.getters;
            this.$store.commit('writeOperate', { isLocked: true });
            let res;
            try {
                res = await fetch([
                    EDIT_SETTING_COLOR_URL, 
                    `?username=${username}`, 
                    `&password=${password}`, 
                    `&color=${color}`
                ].join(''));
                res = await res.json();
            } catch(err) {
                this.$store.commit('writeOperate', { isLocked: false });
                throw err;
            }
            this.$store.commit('writeOperate', { isLocked: false });
            this.$message({
                type: res.error ? 'error' : 'success',
                message: res.error ? res.result : '颜色编辑成功'
            });
            this.$store.commit('writeColor', { color });
        }
    }
};
</script>

<style lang="less" scoped>
.view-color-setting {
    &-tip {
        padding: 0;
        margin-bottom: 50px;
        line-height: 90%;
    }
    &-content {
        padding: 0;
    }
}
</style>