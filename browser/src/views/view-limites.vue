<template>
    <el-container>
        <el-header class="view-limites-tip"
                   height="auto">
            <el-alert title="页面描述"
                      description="该页面提供系统权限的管理功能，可以分段查询权限信息，同时也可以进行新增、编辑、删除和查看明细操作"
                      :closable="false"
                      show-icon>
            </el-alert>
        </el-header>
        <el-main class="view-limites-content">
            <ser-group :to.sync="tab"
                       :tabs="[
                           { key: 'mainifest', title: '权限清单', received: true },
                           { key: 'new', title: '新增', received: true },
                           { key: 'edit', title: '编辑', received: false }
                       ]">
                <ser-limites slot="mainifest"
                             limitesHeight="12.5rem"
                             :fill="true"
                             :total="total"
                             :limites="limites"
                             @query="enterQueryLimites"
                             @detail="enterQueryLimit"
                             @remove="enterRemoveLimit">
                </ser-limites>
                <ser-limit slot="new"
                           class="view-limites-detail"
                           :navigators="navigators"
                           @validated="enterNewLimit">
                </ser-limit>
                <ser-limit slot="edit"
                           class="view-limites-detail"
                           :limit="middle"
                           :navigators="navigators"
                           @validated="enterEditLimit">
                </ser-limit>
            </ser-group>
        </el-main>
    </el-container>
</template>

<script>
import ServiceGroup from '../components/service-group.vue';
import ServiceLimit from '../components/service-limit.vue';
import ServiceLimites from '../components/service-limites.vue';
import { NEW_LIMIT_URL, REMOVE_LIMIT_URL, EDIT_LIMIT_URL, QUERY_LIMIT_URL, QUERY_LIMITES_URL, QUERY_NAVIGATORS_URL } from '../config';

export default {
    components: {
        'ser-group': ServiceGroup,
        'ser-limit': ServiceLimit,
        'ser-limites': ServiceLimites
    },
    data: () => ({
        tab: '',
        navigators: [],
        limites: [],
        total: 0,
        middle: null
    }),
    created: async function() {
        const { username, password } = this.$store.getters;
        let res = await fetch([QUERY_NAVIGATORS_URL, `?username=${username}`, `&password=${password}`].join(''));
        res = await res.json();
        const { error, result } = res;
        if(!error) {
            this.navigators.splice(0, this.navigators.length, ...result.map(cur => 
                ({ 
                    id: cur.id, 
                    name: cur.name,
                    disable: Boolean(cur.path || cur.parentID) 
                })
            ));
            return;
        }
        this.$message({ type: 'error', message: result });
    },
    methods: {
        enterNewLimit: async function(limit) {
            if(!limit) return;
            const { username, password } = this.$store.getters;
            this.$store.commit('writeOperate', { isLocked: true });
            let res;
            try {
                res = await fetch([
                    NEW_LIMIT_URL,
                    `?username=${username}`,
                    `&password=${password}`,
                    `&name=${limit.name}`,
                    `&icon=${limit.icon}`,
                    `&path=${limit.path}`,
                    `&navigator=${limit.navigator}`,
                    `&parentID=${limit.parent}`
                ].join(''));
                res = await res.json();
            } catch(err) {
                this.$store.commit('writeOperate', { isLocked: false });
                throw err;
            }
            this.$store.commit('writeOperate', { isLocked: false });
            const { error, result } = res;
            this.$message({
                type: error ? 'error' : 'success',
                message: error ? result : '权限新增成功'
            });
        },
        enterEditLimit: async function(limit) {
            if(!limit) return;
            const { username, password } = this.$store.getters;
            this.$store.commit('writeOperate', { isLocked: true });
            let res;
            try {
                res = await fetch([
                    EDIT_LIMIT_URL,
                    `?username=${username}`,
                    `&password=${password}`,
                    `&id=${limit.id}`,
                    `&name=${limit.name}`,
                    `&icon=${limit.icon}`,
                    `&path=${limit.path}`
                ].join(''));
                res = await res.json();
            } catch(err) {
                this.$store.commit('writeOperate', { isLocked: false });
                throw err;
            }
            this.$store.commit('writeOperate', { isLocked: false });
            const { error, result } = res;
            if(!error) {
                Object.assign(this.middle, result);
                this.tab = 'mainifest';
                return;
            }
            this.$message({ type: 'error', message: result });
        },
        enterQueryLimites: async function(navigator, index, count) {
            const { username, password } = this.$store.getters;
            this.$store.commit('writeOperate', { isLocked: true });
            let res;
            try {
                res = await fetch([
                    QUERY_LIMITES_URL,
                    `?username=${username}`,
                    `&password=${password}`,
                    `&navigator=${navigator}`,
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
                this.limites.splice(0, this.limites.length, ...result.limits.map(cur =>
                    Object.assign(cur, {
                        icon: '',
                        navigator: false,
                        parent: '',
                        parentName: '',
                        completed: false
                    })
                ));
                return;
            }
            this.$message({ type: 'error', message: result });
        },
        enterQueryLimit: async function(limit, expand) {
            if(!limit.completed) {
                const { username, password } = this.$store.getters;
                this.$store.commit('writeOperate', { isLocked: true });
                let res;
                try {
                    res = await fetch([
                        QUERY_LIMIT_URL,
                        `?username=${username}`,
                        `&password=${password}`,
                        `&id=${limit.id}`
                    ].join(''));
                    res = await res.json();
                } catch(err) {
                    this.$store.commit('writeOperate', { isLocked: false });
                    throw err;
                }
                this.$store.commit('writeOperate', { isLocked: false });
                const { error, result } = res;
                if(error) return this.$message({ type: 'error', message: result });
                const parent = result.parentID;
                delete result.parentID;
                Object.assign(limit, result, {
                    parent,
                    completed: true
                });
            }
            if(expand) return;
            Object.assign(this, { middle: limit, tab: 'edit' });
        },
        enterRemoveLimit: async function(limit, index, limites) {
            const { username, password } = this.$store.getters;
            this.$store.commit('writeOperate', { isLocked: true });
            let res;
            try {
                res = await fetch([
                    REMOVE_LIMIT_URL,
                    `?username=${username}`,
                    `&password=${password}`,
                    `&id=${limit.id}`
                ].join(''));
                res = await res.json();
            } catch(err) {
                this.$store.commit('writeOperate', { isLocked: false });
                throw err;
            }
            this.$store.commit('writeOperate', { isLocked: false });
            const { error, result } = res;
            if(!error) {
                limites.splice(limites.indexOf(limit), 1);
                this.total--;
                return;
            }
            this.$message({ type: 'error', message: result });
        }
    }
};
</script>

<style lang="less" scoped>
.view-limites {
    &-tip {
        padding: 0;
        line-height: 90%;
        margin-bottom: 20px;
    }
    &-content {
        padding: 0;
    }
    &-detail {
        margin: 0 30px;
    }
}
</style>