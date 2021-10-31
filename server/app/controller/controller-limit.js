'use strict';

const { Controller } = require('egg');

class LimitController extends Controller {
    async appendLimit() {
        const { username, password, name, path, navigator, parentID } = this.ctx.query,
            cpath = this.ctx.path,
            res = await this.service.serviceLimit.appendLimit(name, path, navigator, parentID, {
                username,
                password,
                path: cpath
            });
        this.ctx.body = { error: res[0], result: res[1] };
    }

    async removeLimit() {
        const { username, password, id } = this.ctx.query,
            path = this.ctx.path,
            res = await this.service.serviceLimit.removeLimit(id, {
                username,
                password,
                path
            });
        this.ctx.body = { error: res[0], result: res[1] };
    }

    async writeLimit() {
        const { username, password, id, name, path } = this.ctx.query,
            cpath = this.ctx.path,
            res = await this.service.serviceLimit.writeLimit(id, name, path, {
                username, 
                password,
                path: cpath
            });
        this.ctx.body = { error: res[0], result: res[1] };
    }

    async queryLimit() {
        const { username, password, id } = this.ctx.query,
            path = this.ctx.path,
            res = await this.service.serviceLimit.queryLimit(id, {
                username,
                password,
                path
            });
        this.ctx.body = { error: res[0], result: res[1] };
    }

    async queryLimits() {
        const { username, password, navigator, index, count } = this.ctx.query,
            path = this.ctx.path,
            res = await this.service.serviceLimit.queryLimits(navigator, index, count, {
                username,
                password,
                path
            });
        this.ctx.body = { error: res[0], result: res[1] }; 
    }

    async queryNavigators() {
        const { username, password } = this.ctx.query,
            path = this.ctx.path,
            res = await this.service.serviceLimit.queryNavigators({
                username,
                password,
                path
            });
        this.ctx.body = { error: res[0], result: res[1] };
    }
}

module.exports = LimitController;