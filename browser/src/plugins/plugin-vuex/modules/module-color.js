export default {
    state: {
        _color: sessionStorage._color
    },
    getters: {
        color: cur => cur._color
    },
    mutations: {
        writeColor: function(cur, options) {
            cur._color = (sessionStorage._color = options.color);
        }
    }
};