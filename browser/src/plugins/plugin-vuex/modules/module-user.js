// 当前用户领域模块

export default {
    state: {
        _username: sessionStorage._username,
        _password: sessionStorage._password,
        _realname: sessionStorage._realname,
        _path: sessionStorage._path,
        _operators: sessionStorage._operators ? JSON.parse(sessionStorage._operators) : []
    },
    getters: {
        username: cur => cur._username,
        password: cur => cur._password,
        realname: cur => cur._realname,
        path: cur => cur._path,
        operators: cur => cur._operators,
        defaultPath: cur => {
            const first = cur._operators.filter(operator => !operator.children)[0];
            return first && first.path;
        }
    },
    mutations: {
        writeUser: function(cur, options) {
            Object.assign(cur, {
                _username: (sessionStorage._username = options.username),
                _password: (sessionStorage._password = options.password),
                _realname: (sessionStorage._realname = options.realname),
                _path: (sessionStorage._path = options.path)
            });
            cur._operators.splice(0, cur._operators.length, ...options.operators);
            sessionStorage._operators = JSON.stringify(cur._operators);
        } 
    }
};