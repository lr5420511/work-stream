<template>
    <el-container>
        <el-main class="service-roles-wrap">
            <el-input class="service-roles-line"
                      prefix-icon="el-icon-search"
                      placeholder="键入角色名称查询"
                      v-model="keyword"
                      @change="rolesSearch">
                <el-button slot="append"
                           icon="el-icon-refresh"
                           @click.stop="rolesRefresh">
                </el-button>
            </el-input>
            <el-table class="service-roles-line"
                      :height="rolesHeight"
                      :data="roles">
                <el-empty slot="empty"
                          description="暂无数据">
                </el-empty>
                <el-table-column label="名称"
                                 prop="name"
                                 min-width="160">
                </el-table-column>
                <el-table-column label="说明"
                                 prop="description"
                                 min-width="370">
                </el-table-column>
                <el-table-column label="交互"
                                 align="center"
                                 min-width="80">
                    <el-row slot-scope="scope">
                        <el-button size="mini"
                                   icon="el-icon-edit"
                                   @click.stop="rolesEdit(scope.$index, scope.row)"
                                   circle>
                        </el-button>
                        <el-button type="danger"
                                   size="mini"
                                   icon="el-icon-delete"
                                   @click.stop="rolesRemove(scope.$index, scope.row)"
                                   circle>
                        </el-button>
                    </el-row>
                </el-table-column>
            </el-table>
            <el-pagination class="service-roles-line"
                           layout="total, ->, prev, pager, next"
                           :page-size="count"
                           :total="total"
                           :current-page.sync="current">
            </el-pagination>
        </el-main>
    </el-container>
</template>

<script>
export default {
    props: {
        rolesHeight: {
            type: String,
            default: '10rem',
            validator: val => /^(?:0\.0*[1-9]\d*rem|[1-9]\d*(?:\.0*[1-9]\d*rem|rem|px))$/i.test(val)
        },
        fill: {
            type: Boolean,
            default: false
        },
        count: {
            type: Number,
            default: 15,
            validator: val => val > 0 && val === Math.floor(val)
        },
        total: {
            type: Number,
            default: 0,
            validator: val => val >= 0 && val === Math.floor(val)
        },
        roles: {
            type: Array,
            default: () => []
        }
    },
    data: () => ({
        keyword: '',
        current: 1
    }),
    created: function() {
        this.fill && this.rolesSearch();
    },
    methods: {
        rolesSearch: function() {
            const temp = this.current,
                executable = temp === (this.current = 1);
            executable && this.$emit('query', this.keyword, this.current - 1, this.count);
        },
        rolesEdit: function(index, role) {
            this.$emit('edit', role, index, this.roles);
        },
        rolesRemove: function(index, role) {
            this.$emit('remove', role, index, this.roles);
        },
        rolesRefresh: function() {
            this.$emit('query', this.keyword, this.current - 1, this.count);
        }
    },
    watch: {
        current: function(val) {
            this.$nextTick(() => this.$emit('query', this.keyword, val - 1, this.count));
        }
    }
};
</script>

<style lang="less" scoped>
.service-roles {
    &-wrap {
        padding: 0;
    }
    &-line {
        margin-bottom: 10px;
    }
}
</style>