// 用户操作领域模块

export default {
    state: {
        _isLocked: false
    },
    getters: {
        isLocked: cur => cur._isLocked
    },
    mutations: {
        writeOperate: function(cur, options) {
            cur._isLocked = options.isLocked;
        }
    }
};