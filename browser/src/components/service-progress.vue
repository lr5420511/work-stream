<template>
    <el-progress :show-text="false"
                 :stroke-width="progressWidth"
                 :percentage="middle">
    </el-progress>
</template>

<script>
export default {
    props: {
        progressWidth: {
            type: Number,
            default: 1,
            validator: val => val > 0
        },
        value: {
            type: Number,
            default: 0,
            validator: val => val >= 0 && val <= 100
        }
    },
    data: () => ({
        middle: 0,
        timer: null
    }),
    created: function() {
        this.middle = this.value;
    },
    watch: {
        value: function(val) {
            clearInterval(this.timer);
            val = Math.min(100, Math.max(0, val));
            if(val) {
                const vector = val - this.middle;
                this.timer = setInterval(() => {
                    const temp = (this.middle += vector ? (vector > 0 ? 1 : -1) : 0);
                    if(temp === val) {
                        clearInterval(this.timer);
                        this.$emit('stepped', val);
                    }
                }, 40);
                return;
            }
            this.middle = val;
        }
    }
};
</script>

<style lang="less" scoped>
</style>