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
@import url(./assets/less/flex-mixin.less);

.devices-mx(@v-devices, @v-rem-percent);

body {
    .flex-mx();
    margin: 0;
}
</style>

<style lang="less" scoped>
@import url(./assets/less/flex-mixin.less);

#root {
    .flex-mx();
}
</style>