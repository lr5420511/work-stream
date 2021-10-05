'use strict';

module.exports = app => {
    const { router, controller } = app;

    // 获取系统设置
    router.get('/query/settings', controller.controllerSettings.queryAll);

    // 编辑颜色风格
    router.get('/edit/color', controller.controllerSettings.writeColor);
};