<template>
    <el-carousel class="service-scene"
                 direction="vertical"
                 :interval="4000"
                 :height="carouselHeight">
        <el-carousel-item v-for="(cur, i) in scenes"
                          :key="i">
            <el-image class="service-scene-content"
                      fit="fill"
                      :src="cur">
                <template slot="placeholder">
                    <i class="el-icon-loading"></i>
                </template>
                <template slot="error">
                    <i class="el-icon-picture-outline"></i>
                </template>
            </el-image>
        </el-carousel-item>
    </el-carousel>
</template>

<script>
export default {
    props: {
        sceneHeight: {
            type: Number,
            default: 0,
            validator: cur => cur >= 0
        },
        scenes: {
            type: Array,
            default: () => Array(2).fill(''),
            validator: cur => cur.length > 1
        }
    },
    computed: {
        carouselHeight: cur => `${cur.sceneHeight}px`
    }
};
</script>

<style lang="less" scoped>
@import url(../assets/less/variables.less);
@import url(../assets/less/center-mixin.less);

.service-scene {
    background-color: extract(@v-colors, 5);
    &-content {
        .center-mx();
        width: 100%;
        height: 100%;
    }
}
</style>