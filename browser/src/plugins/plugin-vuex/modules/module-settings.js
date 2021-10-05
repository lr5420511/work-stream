// 系统设置领域模块

export default {
    state: {
        _scenes: [],
        _color: sessionStorage._color
    },
    getters: {
        scenes: cur => cur._scenes.length > 1 ? cur._scenes : Array(2).fill(null),
        color: cur => cur._color
    },
    mutations: {
        writeScenes: function(cur, options) {
            cur._scenes.splice(0, cur._scenes.length, ...options.scenes);
        },
        writeColor: function(cur, options) {
            cur._color = (sessionStorage._color = options.color);
        }
    }
};