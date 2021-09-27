<template>
    <div id="root">
        <router-view></router-view>
    </div>
</template>

<script>
export default {};
</script>

<style lang="less">
@import url(./assets/less/variables.less);
@import url(./assets/less/devices-mixin.less);

.devices-mx(@v-devices, @v-rem-percent);

body {
    float: left;
    width: 100%;
    overflow: hidden;
    margin: 0;
    background-color: #ccc;
}
</style>

<style lang="less" scoped>
#root {
    float: left;
    width: 100%;
    overflow: hidden;
}
</style>