<template>
    <el-tabs :stretch="true"
             :before-leave="beforeLeaveHook"
             v-model="tab">
        <el-tab-pane v-for="(cur, i) in tabs"
                     :key="i"
                     :label="cur.title"
                     :name="cur.key">
            <slot :name="cur.key"></slot>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
export default {
    props: {
        tabs: {
            type: Array,
            default: () => [
                { key: '0', title: 'DEFAULT-TITLE', received: true }
            ],
            validator: val => val.length > 0 && val.some(cur => cur.received)
        },
        to: {
            type: String,
            default: ''
        }
    },
    data: () => ({
        tab: null
    }),
    created: function() {
        this.tabs.some(tab => tab.received && (this.tab = tab.key));
    },
    methods: {
        beforeLeaveHook: function(to) {
            const valid = this.tabs
                .reduce((res, tab) => (tab.received || res.push(tab.key)) && res, [])
                .indexOf(to) < 0;
            return valid || to === this.tab;
        }
    },
    watch: {
        to: function(val) {
            const valid = this.tabs.some(tab => tab.key === val);
            valid && (this.tab = val);
        },
        tab: function(val) {
            this.$emit('update:to', val);
        }
    }
};
</script>

<style lang="less" scoped>
</style>