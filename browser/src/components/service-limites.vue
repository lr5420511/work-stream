<template>
    <el-container>
        <el-main class="service-limites-wrap">
            <el-radio-group class="service-limites-line"
                            v-model="navigator">
                <el-radio :label="true" border>导航权限</el-radio>
                <el-radio :label="false" border>操作权限</el-radio>
            </el-radio-group>
            <el-table class="service-limites-line"
                      :height="limitesHeight"
                      :data="limites"
                      @expand-change="limitesExpand">
                <el-empty slot="empty"
                          description="暂无数据">
                </el-empty>
                <el-table-column type="expand"
                                 min-width="20">
                    <el-descriptions slot-scope="scope"
                                     v-if="scope.row.completed"
                                     :column="1"
                                     border>
                        <el-descriptions-item label="ID">
                            {{ scope.row.id }}
                        </el-descriptions-item>
                        <el-descriptions-item label="名称">
                            {{ scope.row.name }}
                        </el-descriptions-item>
                        <el-descriptions-item label="图标">
                            <i :class="scope.row.icon"></i>
                        </el-descriptions-item>
                        <el-descriptions-item label="路由">
                            {{ scope.row.path }}
                        </el-descriptions-item>
                        <el-descriptions-item label="类别">
                            {{ scope.row.navigator ? '导航' : '操作' }}模式权限
                        </el-descriptions-item>
                        <el-descriptions-item label="父级">
                            {{ scope.row.parent ? scope.row.parentName : '无' }}
                        </el-descriptions-item>
                    </el-descriptions>
                </el-table-column>
                <el-table-column label="名称"
                                 prop="name"
                                 min-width="150">
                </el-table-column>
                <el-table-column label="路由"
                                 prop="path"
                                 min-width="360">
                </el-table-column>
                <el-table-column label="交互"
                                 align="center"
                                 min-width="80">
                    <el-row slot-scope="scope">
                        <el-button size="mini"
                                   icon="el-icon-edit"
                                   @click.stop="limitesEdit(scope.$index, scope.row)"
                                   circle>
                        </el-button>
                        <el-button size="mini"
                                   type="danger"
                                   icon="el-icon-delete"
                                   @click.stop="limitesRemove(scope.$index, scope.row)"
                                   circle>
                        </el-button>
                    </el-row>
                </el-table-column>
            </el-table>
            <el-pagination class="service-limites-line"
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
        limitesHeight: {
            type: String,
            default: '10rem',
            validator: val => /^(?:0\.0*[1-9]\d*rem|[1-9]\d*(?:\.0*[1-9]\d*rem|rem|px))$/.test(val)
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
        limites: {
            type: Array,
            default: () => []
            // 成员实例数据结构 { id: [id], name: [name], icon: [icon], path: [path], navigator: [navigator], parent: [parentID], parentName: [parentName], completed: [completed] }
        }
    },
    data: () => ({
        navigator: false,
        current: 1 
    }),
    created: function() {
        this.fill && (this.navigator = !this.navigator);
    },
    methods: {
        limitesExpand: function(limit, expands) {
            const index = expands.indexOf(limit);
            if(index < 0) return;
            this.$emit('detail', limit, true, index, this.limites);
        },
        limitesEdit: function(index, limit) {
            this.$emit('detail', limit, false, index, this.limites);
        },
        limitesRemove: function(index, limit) {
            this.$emit('remove', limit, index, this.limites);
        }
    },
    watch: {
        navigator: function(val) {
            const temp = this.current,
                executable = temp === (this.current = 1);
            if(!executable) return;
            this.$nextTick(() => this.$emit('query', val, this.current - 1, this.count));
        },
        current: function(val) {
            this.$nextTick(() =>
                this.$emit('query', this.navigator, val - 1, this.count)
            );
        }
    }
};
</script>

<style lang="less" scoped>
.service-limites {
    &-wrap {
        padding: 0;
    }
    &-line {
        margin-bottom: 10px;
    }
}
</style>