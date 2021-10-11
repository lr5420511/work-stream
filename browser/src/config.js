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