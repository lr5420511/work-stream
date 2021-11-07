<template>
    <el-container>
        <el-header class="view-roles-tip"
                   height="auto">
            <el-alert title="页面描述"
                      description="该页面提供系统角色的管理功能，可以分段查询角色信息，同时也可以进行新增、编辑和删除操作"
                      :closable="false"
                      show-icon>
            </el-alert>
        </el-header>
        <el-main class="view-roles-content">
            <ser-group :to.sync="tab" 
                       :tabs="[
                           { key: 'mainifest', title: '角色清单', received: true },
                           { key: 'new', title: '新增', received: true },
                           { key: 'edit', title: '编辑', received: false }
                       ]">
                <ser-roles slot="mainifest"
                           rolesHeight="12.2rem"
                           :fill="true"
                           :total="total"
                           :roles="roles"
                           @query="enterQueryRoles"
                           @edit="handleEditRole"
                           @remove="handleRemoveRole">
                </ser-roles>
                <ser-role slot="new"
                          class="view-roles-detail"
                          @validated="enterNewRole">
                </ser-role>
                <ser-role slot="edit"
                          class="view-roles-detail"
                          :role="middle"
                          @validated="enterEditRole">
                </ser-role>
            </ser-group>
        </el-main>
    </el-container>
</template>

<script>
import ServiceGroup from '../components/service-group.vue';
import ServiceRoles from '../components/service-roles.vue';
import ServiceRole from '../components/service-role.vue';
import { NEW_ROLE_URL, REMOVE_ROLE_URL, EDIT_ROLE_URL, QUERY_ROLES_URL } from '../config';

export default {
    components: {
        'ser-group': ServiceGroup,
        'ser-roles': ServiceRoles,
        'ser-role': ServiceRole
    },
    data: () => ({
        tab: '',
        roles: [],
        total: 0,
        middle: null
    }),
    methods: {
        enterNewRole: async function(role) {
            if(!role) return;
            const { username, password } = this.$store.getters;
            this.$store.commit('writeOperate', { isLocked: true });
            let res;
            try {
                res = await fetch([
                    NEW_ROLE_URL,
                    `?username=${username}`,
                    `&password=${password}`,
                    `&name=${role.name}`,
                    `&description=${role.description}`
                ].join(''));
                res = await res.json();
            } catch(err) {
                this.$store.commit('writeOperate', { isLocked: false });
                throw err;
            }
            this.$store.commit('writeOperate', { isLocked: false });
            const { error } = res;
            this.$message({
                type: error ? 'error' : 'success',
                message: error ? res.result : '角色新增成功'
            });
        },
        enterEditRole: async function(role) {
            if(!role) return;
            const { username, password } = this.$store.getters;
            this.$store.commit('writeOperate', { isLocked: true });
            let res;
            try {
                res = await fetch([
                    EDIT_ROLE_URL,
                    `?username=${username}`,
                    `&password=${password}`,
                    `&id=${role.id}`,
                    `&name=${role.name}`,
                    `&description=${role.description}`
                ].join(''));
                res = await res.json();
            } catch(err) {
                this.$store.commit('writeOperate', { isLocked: false });
                throw err;
            }
            this.$store.commit('writeOperate', { isLocked: false });
            const { error, result } = res;
            if(!error) {
                Object.assign(this.middle, { 
                    name: result.name, 
                    description: result.description 
                });
                this.tab = 'mainifest';
                return;
            }
            this.$message({ type: 'error', message: result });
        },
        enterQueryRoles: async function(keyword, index, count) {
            const { username, password } = this.$store.getters;
            this.$store.commit('writeOperate', { isLocked: true });
            let res;
            try {
                res = await fetch([
                    QUERY_ROLES_URL,
                    `?username=${username}`,
                    `&password=${password}`,
                    `&name=${keyword}`,
                    `&index=${index}`,
                    `&count=${count}`
                ].join(''));
                res = await res.json();
            } catch(err) {
                this.$store.commit('writeOperate', { isLocked: false });
                throw err;
            }
            this.$store.commit('writeOperate', { isLocked: false });
            const { error, result } = res;
            if(!error) {
                this.total = result.total;
                this.roles.splice(0, this.roles.length, ...result.roles.map(role => role));
                return;
            }
            this.$message({ type: 'error', message: result });
        },
        handleEditRole: function(role) {
            this.middle = role;
            this.tab = 'edit';
        },
        handleRemoveRole: async function(role, index, roles) {
            const { username, password } = this.$store.getters;
            this.$store.commit('writeOperate', { isLocked: true });
            let res;
            try {
                res = await fetch([
                    REMOVE_ROLE_URL,
                    `?username=${username}`,
                    `&password=${password}`,
                    `&id=${role.id}`
                ].join(''));
                res = await res.json();
            } catch(err) {
                this.$store.commit('writeOperate', { isLocked: false });
                throw err;
            }
            this.$store.commit('writeOperate', { isLocked: false });
            const { error, result } = res;
            if(!error) {
                roles.splice(roles.indexOf(role), 1);
                this.total--;
                return;
            }
            this.$message({ type: 'error', message: result });
        }
    }
};
</script>

<style lang="less" scoped>
.view-roles {
    &-tip {
        padding: 0;
        margin-bottom: 20px;
        line-height: 90%;
    }
    &-content {
        padding: 0;
    }
    &-detail {
        margin: 0 30px;
    }
}
</style>