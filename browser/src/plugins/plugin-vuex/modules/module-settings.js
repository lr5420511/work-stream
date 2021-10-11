// 系统设置领域模块

export default {
    state: {
        _scenes: sessionStorage._scenes ? JSON.parse(sessionStorage._scenes) : [],
        _color: sessionStorage._color
    },
    getters: {
        scenes: cur => cur._scenes,
        color: cur => cur._color
    },
    mutations: {
        writeScenes: function(cur, options) {
            cur._scenes.splice(0, cur._scenes.length, ...options.scenes);
            sessionStorage._scenes = JSON.stringify(cur._scenes);
        },
        writeColor: function(cur, options) {
            cur._color = (sessionStorage._color = options.color);
        },
        appendScene: function(cur, options) {
            cur._scenes.push(options.scene);
            sessionStorage._scenes = JSON.stringify(cur._scenes);
        },
        removeScene: function(cur, options) {
            cur._scenes.splice(cur._scenes.indexOf(options.scene), 1);
            sessionStorage._scenes = JSON.stringify(cur._scenes);
        }
    }
};