<template>
    <el-container>
        <el-main class="service-multiple-wrap">
            <el-checkbox class="service-multiple-check"
                         :indeterminate="unknow"
                         :value="isAll"
                         @input="checkAll">
                <em>全选</em>
            </el-checkbox>
            <el-checkbox-group :value="value"
                               @input="checkOption">
                <el-checkbox class="service-multiple-check"
                             v-for="(cur, i) in options"
                             :key="i"
                             :label="cur.value">
                {{ cur.title }}
                </el-checkbox>
            </el-checkbox-group>
        </el-main>
    </el-container>
</template>

<script>
export default {
    props: {
        options: {
            type: Array,
            default: () => [],
            validator: val => val.every(option => option.hasOwnProperty('value'))
        },
        value: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        unknow: cur => cur.value.length > 0 && cur.value.length < cur.options.length,
        isAll: cur => cur.value.length > 0 && cur.value.length >= cur.options.length
    },
    methods: {
        checkAll: function(all) {
            this.$emit('input', all ? this.options.map(option => option.value) : []);
        },
        checkOption: function(options) {
            this.$emit('input', options);
        }
    }
};
</script>

<style lang="less" scoped>
@import url(../assets/less/variables.less);

.service-multiple {
    &-wrap {
        padding: 0;
        border: dashed 1px extract(@v-colors, 5);
    }
    &-check {
        margin: 20px 50px 20px 30px;
    }
}
</style>