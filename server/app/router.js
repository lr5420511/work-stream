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

    // 新增权限实例
    router.get('/new/limit', controller.controllerLimit.appendLimit);

    // 删除权限实例
    router.get('/remove/limit', controller.controllerLimit.removeLimit);

    // 编辑权限信息
    router.get('/edit/limit', controller.controllerLimit.writeLimit);

    // 查询指定单个权限信息
    router.get('/query/limit', controller.controllerLimit.queryLimit);

    // 查询指定页多个权限信息
    router.get('/query/limits', controller.controllerLimit.queryLimits);

    // 查询所有导航权限
    router.get('/query/navigators', controller.controllerLimit.queryNavigators);

    // 查询指定角色的导航模式权限
    router.get('/query/navigators-for-role', controller.controllerRoleLimit.queryNavigators);

    // 查询指定角色的操作模式权限
    router.get('/query/operators-for-role', controller.controllerRoleLimit.queryOperators);

    // 授权指定角色导航模式权限
    router.get('/authorize/navigators-for-role', controller.controllerRoleLimit.authorizeNavigators);

    // 授权指定角色操作模式权限
    router.get('/authorize/operators-for-role', controller.controllerRoleLimit.authorizeOperators);
};