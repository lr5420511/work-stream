<template>
    <el-container>
        <el-main class="service-color-wrap">
            <el-row class="service-color-line">
                <el-col :span="6"
                        :offset="18">
                    <el-button type="primary"
                               icon="el-icon-check"
                               @click.stop="enterColor">
                    提 交
                    </el-button>
                    <el-button type="primary"
                               @click.stop="cancelColor"
                               plain>
                    取 消    
                    </el-button>
                </el-col>
            </el-row>
            <el-row class="service-color-line service-color-divider">
                <el-col :span="13"
                        :offset="11"> 
                    <el-color-picker v-model="value"
                                     show-alpha
                    ></el-color-picker>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
export default {
    props: {
        color: {
            type: String,
            default: 'rgba(0,0,0,1)',
            validator: val => /^rgba\((?: *(?:0|1\d{0,2}|2(?:[0-4]\d?|5[0-5]?|[6-9])?|[3-9]\d?) *\,){3} *(?:0(?:\.0*[1-9]\d*)?|1) *\)$/i.test(val)
        }
    },
    data: () => ({
        value: null
    }),
    created: function() {
        this.value = this.color;
    },
    methods: {
        enterColor: function() {
            this.$emit('checked', this.value);
        },
        cancelColor: function() {
            this.value = this.color;
        }
    }
};
</script>

<style lang="less" scoped>
@import url(../assets/less/variables.less);

.service-color {
    &-wrap {
        padding: 0;
    }
    &-line {
        margin-bottom: 50px;
    }
    &-divider {
        padding: 20px 0 0 0;
        border-top: dashed 1px extract(@v-colors, 5);
    }
}
</style>