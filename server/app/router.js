'use strict';

module.exports = app => {
    const { router, controller } = app;

    // 获取系统设置
    router.get('/query/settings', controller.controllerSettings.queryAll);

    // 编辑颜色风格
    router.get('/edit/color', controller.controllerSettings.writeColor);

    // 上传场景源图片
    router.post('/upload/scene', controller.controllerSettings.appendScene);

    // 删除场景源图片
    router.get('/remove/scene', controller.controllerSettings.removeScene);

    // 新增角色实例
    router.get('/new/role', controller.controllerRole.appendRole);

    // 删除角色实例
    router.get('/remove/role', controller.controllerRole.removeRole);

    // 编辑角色信息
    router.get('/edit/role', controller.controllerRole.writeRole);

    // 查询指定单个角色信息
    router.get('/query/role', controller.controllerRole.queryRole);

    // 查询指定页多个角色信息
    router.get('/query/roles', controller.controllerRole.queryRoles);
};