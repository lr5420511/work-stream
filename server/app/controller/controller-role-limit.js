'use strict';

const { Controller } = require('egg');

class RoleLimitController extends Controller {
    async queryNavigators() {
        const { username, password, roleID } = this.ctx.query,
            path = this.ctx.path,
            res = await this.service.serviceRoleLimit.queryLimits(roleID, true, {
                username,
                password,
                path
            });
        this.ctx.body = { error: res[0], result: res[1] };
    }

    async queryOperators() {
        const { username, password, roleID } = this.ctx.query,
            path = this.ctx.path,
            res = await this.service.serviceRoleLimit.queryLimits(roleID, false, {
                username,
                password,
                path
            });
        this.ctx.body = { error: res[0], result: res[1] };
    }

    async authorizeNavigators() {
        const { username, password, roleID } = this.ctx.query,
            limitIDs = this.ctx.queries.limitID || [],
            path = this.ctx.path,
            res = await this.service.serviceRoleLimit.authorizeLimits(roleID, limitIDs, true, {
                username, 
                password,
                path
            });
        this.ctx.body = { error: res[0], result: res[1] };
    }

    async authorizeOperators() {
        const { username, password, roleID } = this.ctx.query,
            limitIDs = this.ctx.queries.limitID || [],
            path = this.ctx.path,
            res = await this.service.serviceRoleLimit.authorizeLimits(roleID, limitIDs, false, {
                username,
                password,
                path
            });
        this.ctx.body = { error: res[0], result: res[1] };
    }
}

module.exports = RoleLimitController;