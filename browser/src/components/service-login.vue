<template>
    <el-form ref="loginForm"
             size="large"
             :model="user"
             :rules="rules">
        <el-form-item class="service-login-line"
                      prop="username">
            <el-input prefix-icon="el-icon-user"
                      placeholder="在此处键入用户名"
                      v-model="user.username"
            ></el-input>
        </el-form-item>
        <el-form-item class="service-login-line"
                      prop="password">
            <el-input prefix-icon="el-icon-lock"
                      placeholder="在此处键入密码"
                      :show-password="true"
                      v-model="user.password"
            ></el-input>
        </el-form-item>
        <el-form-item class="service-login-line">
            <el-button type="primary"
                       icon="el-icon-check"
                       @click.stop="loginEnter">
            立即登入</el-button>
            <el-button type="primary"
                       @click.stop="loginCancel"
                       plain>
            取 消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    props: {
        nameRegular: {
            type: RegExp,
            default: () => /^/
        },
        pwdRegular: {
            type: RegExp,
            default: () => /^/
        }
    },
    data: () => ({
        user: {
            username: '',
            password: ''
        },
        rules: null
    }),
    created: function() {
        this.rules = {
            username: [
                {
                    validator: (_, val, callback) => {
                        const valid = this.nameRegular.test(val);
                        callback(...(valid ? [] : [new Error('输入用户名格式有误，请检查！')]));
                    },
                    trigger: 'change'
                }
            ],
            password: [
                {
                    validator: (_, val, callback) => {
                        const valid = this.pwdRegular.test(val);
                        callback(...(valid ? [] : [new Error('输入密码格式有误，请检查！')]));
                    },
                    trigger: 'change'
                }
            ]
        };
    },
    methods: {
        loginEnter: async function() {
            let res;
            try {
                res = await this.$refs['loginForm'].validate();
            } catch(err) {
                if(typeof err !== 'boolean') throw err;
            }
            this.$emit('validated', res ? this.user : null);
        },
        loginCancel: function() {
            this.$refs['loginForm'].resetFields();
        }
    }
};
</script>

<style lang="less" scoped>
.service-login {
    &-line {
        margin: 0 20px 80px 20px;
    }
}
</style>