<template>
    <el-menu class="service-navigator"
             :router="true"
             :collapse="isCollapsed"
             :default-active="defaultPath"
             :style="{
                 'min-height': minHeight
             }">
        <el-menu-item v-for="(cur, i) in tabOptions"
                      :key="`tab${i}`"
                      :index="cur.path">
            <i :class="cur.icon"></i>
            <span slot="title">{{ cur.title }}</span>
        </el-menu-item>
        <el-submenu v-for="(cur, i) in menuOptions"
                    :key="`menu${i}`"
                    :index="String(i)">
            <template slot="title">
                <i :class="cur.icon"></i>
                <span slot="title">{{ cur.title }}</span>
            </template>
            <el-menu-item v-for="(cur, i) in cur.children"
                          :key="`tab${i}`"
                          :index="cur.path">
            {{ cur.title }}
            </el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
export default {
    props: {
        minHeight: {
            type: String,
            default: '300px',
            validator: val => /^(?:0(?:\.0*[1-9]\d*)?|[1-9]\d*(?:\.0*[1-9]\d*)?|\.0*[1-9]\d*)(?:px|rem)$/i.test(val)
        },
        isCollapsed: {
            type: Boolean,
            default: false
        },
        defaultPath: {
            type: String,
            default: '/',
            validator: val => /^\/(?:[^\n\/]+\/?)*$/.test(val)
        },
        options: {
            type: Array,
            default: () => [
                { icon: '', title: '', path: '/' }
            ],
            validator: val => val.length > 0
        }
    },
    computed: {
        tabOptions: cur => cur.options.filter(option => !option.children),
        menuOptions: cur => cur.options.filter(option => option.children)
    },
    created: function() {
        const exist = (function findPath(options, path) {
            return options.some(option => {
                const { children } = option;
                return children ? findPath(children, path) : path === option.path;
            });
        })(this.options, this.defaultPath);
        if(!exist) throw new Error(`The default path ${this.defaultPath} is invalid.`);
        this.$router.push(this.defaultPath);
    }
};
</script>

<style lang="less" scoped>
.service-navigator {
    min-width: 75px;
}

.service-navigator:not(.el-menu--collapse) {
    width: 300px;
}
</style>