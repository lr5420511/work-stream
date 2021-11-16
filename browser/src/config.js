// 用户名验证规则
export const USER_REGULAR = /^u(?:0+[1-9]\d*|[1-9]\d*)$/i;

// 密码验证规则
export const PWD_REGULAR = /^.{6,}$/;

// 获取全局设置URL
export const GLOBAL_SETTINGS_URL = '/query/settings';

// 简单用户验证URL
export const SIMPLY_VALIDATE_USER_URL = '';

// 详细用户验证URL
export const COMPLEX_VALIDATE_USER_URL = '';

// 编辑系统颜色URL
export const EDIT_SETTING_COLOR_URL = '/edit/color';

// 上传场景图片URL
export const UPLOAD_SETTING_SCENE_URL = '/upload/scene';

// 删除场景图片URL
export const REMOVE_SETTING_SCENE_URL = '/remove/scene';

// 场景图片的最大数量
export const SCENE_MAXIMUM_COUNT = 15;

// 新增角色实例URL
export const NEW_ROLE_URL = '/new/role';

// 删除角色实例URL
export const REMOVE_ROLE_URL = '/remove/role';

// 编辑角色信息URL
export const EDIT_ROLE_URL = '/edit/role';

// 查询指定页角色集合URL
export const QUERY_ROLES_URL = '/query/roles';

// 新增权限实例URL
export const NEW_LIMIT_URL = '/new/limit';

// 删除权限实例URL
export const REMOVE_LIMIT_URL = '/remove/limit';

// 编辑权限信息URL
export const EDIT_LIMIT_URL = '/edit/limit';

// 查询权限实例明细URL
export const QUERY_LIMIT_URL = '/query/limit';

// 查询指定页权限集合URL
export const QUERY_LIMITES_URL = '/query/limits';

// 查询导航权限集合URL
export const QUERY_NAVIGATORS_URL = '/query/navigators';

// 查询角色导航权限集合URL
export const QUERY_NAVIGATORS_FOR_ROLE_URL = '/query/navigators-for-role';

// 查询角色操作权限集合URL
export const QUERY_OPERATORS_FOR_ROLE_URL = '/query/operators-for-role';

// 授权角色导航权限集合URL
export const AUTHORIZE_NAVIGATORS_FOR_ROLE_URL = '/authorize/navigators-for-role';

// 授权角色操作权限集合URL
export const AUTHORIZE_OPERATORS_FOR_ROLE_URL = '/authorize/operators-for-role';