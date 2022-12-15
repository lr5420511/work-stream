<template>
    <el-container>
        <el-header class="view-menu-authorize-tip"
                   height="auto">
            <el-alert description="该页面提供系统角色导航模式权限的授权功能"
                      :closable="false"
                      show-icon>    
            </el-alert>
        </el-header>
        <el-main class="view-menu-authorize-content">
            <el-skeleton :rows="7"
                         :loading="download"
                         animated>
                <ser-authorize :roles="roles"
                               :limites="limites"
                               :checkedState="state"
                               @from="enterQuery"
                               @authorize="enterAuthorize">
                </ser-authorize>
            </el-skeleton>
        </el-main>
    </el-container>
</template>

<script>
import ServiceAuthorize from '../components/service-authorize.vue';
import { QUERY_ROLES_URL, QUERY_LIMITES_URL, QUERY_NAVIGATORS_FOR_ROLE_URL, AUTHORIZE_NAVIGATORS_FOR_ROLE_URL } from '../config';

export default {
    components: {
        'ser-authorize': ServiceAuthorize
    },
    data: () => ({
        download: true,
        cache: {},
        roles: [],
        limites: [],
        state: []
    }),
    created: async function() {
        const { username, password } = this.$store.getters,
            prefixes = [
                `${QUERY_ROLES_URL}?username=${username}&password=${password}&name&index=0&count=`,
                `${QUERY_LIMITES_URL}?username=${username}&password=${password}&navigator=true&index=0&count=`
            ];
        let res = await fetch([prefixes[0], 0].join(''));
        res = await res.json();
        if(res.error) return this.$message({ type: 'error', message: res.result });
        res = await fetch([prefixes[0], res.result.total].join(''));
        res = await res.json();
        if(res.error) return this.$message({ type: 'error', message: res.result });
        this.roles.splice(0, this.roles.length, ...res.result.roles.map(role => 
            ({ id: role.id, name: role.name })
        ));
        res = await fetch([prefixes[1], 0].join(''));
        res = await res.json();
        if(res.error) return this.$message({ type: 'error', message: res.result });
        res = await fetch([prefixes[1], res.result.total].join(''));
        res = await res.json();
        if(res.error) return this.$message({ type: 'error', message: res.result });
        this.limites.splice(0, this.limites.length, ...res.result.limits.map(limit =>
            ({ id: limit.id, name: limit.name })
        ));
        this.download = false;
    },
    methods: {
        enterQuery: async function(role) {
            let caches = this.cache[role];
            if(!caches) {
                const { username, password } = this.$store.getters;
                this.$store.commit('writeOperate', { isLocked: true });
                let res;
                try {
                    res = await fetch([
                        QUERY_NAVIGATORS_FOR_ROLE_URL,
                        `?username=${username}`,
                        `&password=${password}`,
                        `&roleID=${role}`
                    ].join(''));
                    res = await res.json();
                } catch(err) {
                    this.$store.commit('writeOperate', { isLocked: false });
                    throw err;
                }
                this.$store.commit('writeOperate', { isLocked: false });
                const { error, result } = res;
                if(error) return this.$message({ type: 'error', message: result });
                caches = this.cache[result.roleID] = result.limitIDs;
            }
            this.state = caches;
        },
        enterAuthorize: async function(role, limites) {
            const { username, password } = this.$store.getters;
            this.$store.commit('writeOperate', { isLocked: true });
            let res;
            try {
                res = await fetch([
                    AUTHORIZE_NAVIGATORS_FOR_ROLE_URL,
                    `?username=${username}`,
                    `&password=${password}`,
                    `&roleID=${role}`,
                    `&${limites.map(limit => `limitID=${limit}`).join('&')}`
                ].join(''));
                res = await res.json();
            } catch(err) {
                this.$store.commit('writeOperate', { isLocked: false });
                throw err;
            }
            this.$store.commit('writeOperate', { isLocked: false });
            const { error, result } = res;
            if(!error) (this.state = this.cache[result.roleID] = result.limitIDs);
            this.$message({
                type: error ? 'error' : 'success',
                message: error ? result : '角色导航权限授权成功'
            });
        }
    }
};
</script>

<style lang="less" scoped>
.view-menu-authorize {
    &-tip {
        padding: 0;
        line-height: 90%;
        margin-bottom: 20px;
    }
    &-content {
        padding: 0;
    }
}
</style>