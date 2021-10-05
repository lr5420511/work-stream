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
        <ser-color :color="$store.getters.color"
                   @checked="commitColor">
        </ser-color>
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
            let res = await fetch([
                EDIT_SETTING_COLOR_URL,
                '?username=',
                username,
                '&password=',
                password,
                '&color=',
                color
            ].join(''));
            res = await res.json();
            this.$store.commit('writeOperate', { isLocked: false });
            this.$message({
                type: res.error ? 'error' : 'success',
                message: res.error ? res.result : '本次操作执行成功'
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
}
</style>