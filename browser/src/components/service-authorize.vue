<template>
    <el-container>
        <el-main class="service-authorize-wrap">
            <el-select class="service-authorize-line service-authorize-role"
                       placeholder="请选择角色"
                       v-model="role">
                <el-option v-for="(cur, i) in roles"
                           :key="i"
                           :label="cur.name"
                           :value="cur.id">
                </el-option>
            </el-select>
            <ser-multiple class="service-authorize-line"
                          :options="pairs"
                          v-model="state">
            </ser-multiple>
            <el-row class="service-authorize-line">
                <el-button type="primary"
                           icon="el-icon-check"
                           @click.stop="authorizeEnter">
                提 交
                </el-button>
                <el-button type="primary"
                           @click.stop="authorizeCancel"
                           plain>
                取 消
                </el-button>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
import ServiceMultiple from './service-multiple.vue';

export default {
    components: {
        'ser-multiple': ServiceMultiple
    },
    props: {
        roles: {
            type: Array,
            default: () => [],
            validator: val => val.every(role => role.hasOwnProperty('id'))
        },
        limites: {
            type: Array,
            default: () => [],
            validator: val => val.every(limit => limit.hasOwnProperty('id'))
        },
        checkedState: {
            type: Array,
            default: () => []
        }
    },
    data: () => ({
        role: '',
        state: []
    }),
    computed: {
        pairs: cur => cur.limites.map(limit => ({ title: limit.name, value: limit.id }))
    },
    created: function() {
        this.state = this.checkedState.slice();
    },
    methods: {
        authorizeEnter: function() {
            this.$emit('authorize', this.role, this.state);
        },
        authorizeCancel: function() {
            this.state = this.checkedState.slice();
        }
    },
    watch: {
        role: function(val) {
            this.$nextTick(() => this.$emit('from', val));
        },
        checkedState: function(val) {
            this.state = val.slice();
        }
    }
};
</script>

<style lang="less" scoped>
.service-authorize {
    &-wrap {
        padding: 0;
        overflow: hidden;
    }
    &-line {
        margin-bottom: 25px;
    }
    &-role {
        width: 100%;
    }
}
</style>