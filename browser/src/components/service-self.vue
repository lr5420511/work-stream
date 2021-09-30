<template>
    <el-dropdown @command="clickOption">
        <el-avatar fit="fill"
                   :title="name"
                   :src="path"
                   :style="{
                       width: size,
                       height: size
                   }">
        </el-avatar>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(cur, i) in options"
                              :key="i"
                              :command="i"
                              :icon="cur.icon">
            {{ cur.text }}
            </el-dropdown-item>
            <el-dropdown-item :command="options.length"
                              icon="el-icon-switch-button"
                              divided>
            注销
            </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            default: 'anonymous',
            validator: val => val.length > 0
        },
        path: {
            type: String,
            default: ''
        },
        size: {
            type: String,
            default: '24px',
            validator: val => /^(?:0\.0*[1-9]\d*|[1-9]\d*(?:\.0*[1-9]\d*)?|\.0*[1-9]\d*)(?:px|rem)$/i.test(val)
        },
        options: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        clickOption: function(cmd) {
            this.$emit('checked', cmd);
        }
    }    
};
</script>

<style lang="less" scoped>
</style>