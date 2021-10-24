'use strict';

const { Service } = require('egg');

class AuthorizeService extends Service {
    async validate(username, password, pathname) { 
        await new Promise(res => setTimeout(res, 1000));
        return true;
    }
}

module.exports = AuthorizeService;