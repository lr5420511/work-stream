<template>
    <el-form ref="limitForm"
             label-position="top"
             :model="state"
             :rules="rules">
        <el-form-item class="service-limit-line">
            <el-radio-group :disabled="edit"
                            v-model="state.navigator">
                <el-radio :label="true" border>导航权限</el-radio>
                <el-radio :label="false" border>操作权限</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item class="service-limit-line"
                      label="名称"
                      prop="name">
            <el-input v-model="state.name">
            </el-input>
        </el-form-item>
        <el-form-item class="service-limit-line"
                      label="路由"
                      prop="path">
            <el-input v-model="state.path">
            </el-input>
        </el-form-item>
        <el-form-item class="service-limit-line"
                      label="父级"
                      prop="parent">
            <el-select class="service-limit-parent"
                       placeholder="无"
                       :disabled="edit"
                       v-model="state.parent"
                       clearable>
                <el-option v-for="(cur, i) in navigators"
                           :key="i"
                           :label="cur.name"
                           :value="cur.id"
                           :disabled="cur.disable">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item class="service-limit-line">
            <el-button type="primary"
                       icon="el-icon-check"
                       @click.stop="limitEnter">
            提 交
            </el-button>
            <el-button type="primary"
                       @click.stop="limitCancel"
                       plain>
            取 消
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    props: {
        limit: {
            type: Object,
            default: () => null
        },
        navigators: {
            type: Array,
            default: () => [], // 成员数据结构 { id: [id], name: [name], disable: [disable] }
            validator: val => val.every(cur => cur.id)
        }
    },
    data: () => ({
        state: {
            id: null,
            name: '',
            path: '',
            navigator: false,
            parent: ''
        },
        rules: null
    }),
    computed: {
        edit: cur => !!cur.limit
    },
    created: function() {
        Object.assign(this.state, this.limit);
        this.rules = {
            name: [
                {
                    validator: (_, val, callback) => {
                        const valid = /^(?:.|\n){1,30}$/.test(val);
                        callback(...(valid ? [] : [new Error('权限名称必须是1至30个字符，请检查')]));
                    },
                    trigger: 'blur'
                }
            ],
            path: [
                {
                    validator: (_, val, callback) => {
                        const { navigator, parent } = this.state,
                            valid = [
                                [
                                    val => val.length <= 300,
                                    '权限路由必须是0至300个字符，请检查'
                                ],
                                [
                                    val => /^(?:\/|(?:\/(?:[^ \n\/]+\/)*[^ \n\/]+)?)$/.test(val),
                                    '权限路由格式不合法，请检查'

                                ],
                                [
                                    val => navigator ? (!parent || val) : val,
                                    `${navigator ? '导航' : '操作'}权限模式下，当前的权限路由不合法，请检查`
                                ]
                            ].every(([validator, text]) => {
                                const valid = validator(val);
                                valid || callback(new Error(text));
                                return valid;
                            });
                        valid && callback();
                    },
                    trigger: 'blur'
                }
            ],
            parent: [
                {
                    validator: (_, val, callback) => {
                        const { path, navigator } = this.state,
                            valid = navigator ? (path || !val) : !val;
                        callback(...(valid ? [] : [new Error(`${ navigator ? '导航' : '操作' }权限模式下，当前的权限父级不合法，请检查`)]));
                    },
                    trigger: 'change'
                }
            ]
        };
    },
    methods: {
        limitEnter: async function() {
            let valid;
            try {
                valid = await this.$refs['limitForm'].validate();
            } catch(err) {
                if(typeof err !== 'boolean') throw err;
            }
            this.$emit('validated', valid ? this.state : null);
        },
        limitCancel: function() {
            this.$refs['limitForm'].clearValidate();
            Object.assign(this.state, { id: null, name: '', path: '', navigator: false, parent: '' }, this.limit);
        }
    },
    watch: {
        limit: function(val) {
            Object.assign(this.state, val);
        }
    }
};
</script>

<style lang="less" scoped>
.service-limit {
    &-line {
        margin-bottom: 25px;
    }
    &-parent {
        width: 100%;
    }
}
</style>