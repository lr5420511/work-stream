'use strict';

const { Controller } = require('egg');

class RoleController extends Controller {
    async appendRole() {
        const { username, password, name, description } = this.ctx.query,
            path = this.ctx.path,
            res = await this.service.serviceRole.appendRole(name, description, {
                username,
                password,
                path
            });
        this.ctx.body = { error: res[0], result: res[1] };
    }

    async removeRole() {
        const { username, password, id } = this.ctx.query,
            path = this.ctx.path,
            res = await this.service.serviceRole.removeRole(id, {
                username,
                password,
                path
            });
        this.ctx.body = { error: res[0], result: res[1] };
    }

    async writeRole() {
        const { username, password, id, name, description } = this.ctx.query,
            path = this.ctx.path,
            res = await this.service.serviceRole.writeRole(id, name, description, {
                username,
                password,
                path
            });
        this.ctx.body = { error: res[0], result: res[1] };
    }

    async queryRole() {
        const { username, password, id } = this.ctx.query,
            path = this.ctx.path,
            res = await this.service.serviceRole.queryRole(id, {
                username,
                password,
                path
            });
        this.ctx.body = { error: res[0], result: res[1] };
    }

    async queryRoles() {
        const { username, password, name, index, count } = this.ctx.query,
            path = this.ctx.path,
            res = await this.service.serviceRole.queryRoles(name, index, count, {
                username, 
                password,
                path
            });
        this.ctx.body = { error: res[0], result: res[1] };
    }
}

module.exports = RoleController;