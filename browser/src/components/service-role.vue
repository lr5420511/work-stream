<template>
    <el-form ref="roleForm"
             label-position="top"
             :model="state"
             :rules="rules">
        <el-form-item label="角色名称"
                      prop="name">
            <el-input v-model="state.name">
            </el-input>
        </el-form-item>
        <el-form-item label="说明"
                      prop="description">
            <el-input type="textarea"
                      :rows="5"
                      v-model="state.description">
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary"
                       icon="el-icon-check"
                       @click.stop="roleEnter">
            提 交
            </el-button>
            <el-button type="primary"
                       @click.stop="roleCancel"
                       plain>
            取 消
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    props: {
        role: {
            type: Object,
            default: () => ({})
        }
    },
    data: () => ({
        state: {
            id: null,
            name: '',
            description: ''
        },
        rules: null
    }),
    created: function() {
        Object.assign(this.state, this.role);
        this.rules = {
            name: [
                {
                    validator: (_, val, callback) => {
                        const valid = /^.{1,30}$/.test(val);
                        callback(...(valid ? [] : [new Error('角色名称必须是1至30个字符，请检查')]));
                    },
                    trigger: 'blur'
                }
            ],
            description: [
                {
                    validator: (_, val, callback) => {
                        const valid = /^(?:.|\n){0,300}$/.test(val);
                        callback(...(valid ? [] : [new Error('角色说明必须是0至300个字符，请检查')]));
                    },
                    trigger: 'blur'
                }
            ]
        };
    },
    methods: {
        roleEnter: async function() {
            let valid;
            try {
                valid = await this.$refs['roleForm'].validate();
            } catch(err) {
                if(typeof err !== 'boolean') throw err;
            }
            this.$emit('validated', valid ? this.state : null);
        },
        roleCancel: function() {
            this.$refs['roleForm'].clearValidate();
            Object.assign(this.state, { id: null, name: '', description: '' }, this.role);
        }
    },
    watch: {
        role: function(val) {
            Object.assign(this.state, val);
        }
    }
};
</script>

<style lang="less" scoped>
.service-role {
    &-line {
        margin-bottom: 20px;
    }
}
</style>