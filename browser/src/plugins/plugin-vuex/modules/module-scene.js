// 场景展示领域模块

export default {
    state: {
        _scenes: []
    },
    getters: {
        scenes: cur => cur._scenes.length > 1 ? cur._scenes : Array(2).fill(null)
    },
    mutations: {
        writeScenes: function(cur, options) {
            cur._scenes.splice(0, cur._scenes.length, ...options.scenes);
        }
    }
};