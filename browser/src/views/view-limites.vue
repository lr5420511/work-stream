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
                <ser-limites slot="mainifest">
                </ser-limites>
                <ser-limit slot="new"
                           class="view-limites-detail"
                           :navigators="navigators"
                           @validated="enterNewLimit">
                </ser-limit>
                <ser-limit slot="edit"
                           class="view-limites-detail">
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
        olds: []
    }),
    computed: {
        navigators: cur => cur.olds.map(old => 
            ({ id: old.id, name: old.name, disable: old.path || old.parentID })
        )
    },
    created: async function() {
        const { username, password } = this.$store.getters;
        let res = await fetch([QUERY_NAVIGATORS_URL, `?username=${username}`, `&password=${password}`].join(''));
        res = await res.json();
        const { error, result } = res;
        if(!error) {
            this.olds.splice(0, this.olds.length, ...result);
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
        }
    }
};
</script>

<style lang="less" scoped>
.view-limites {
    &-tip {
        padding: 0;
        line-height: 90%;
        margin-bottom: 50px;
    }
    &-content {
        padding: 0;
    }
    &-detail {
        margin: 0 30px;
    }
}
</style>