'use strict';

const { Controller } = require('egg');

class SettingsController extends Controller {
    async queryAll() {
        const res = await this.service.serviceSettings.queryAll();
        this.ctx.body = { error: res[0], result: res[1] };
    }

    async writeColor() {
        const { username, password, color } = this.ctx.query,
            path = this.ctx.path,
            res = await this.service.serviceSettings.writeColor(color, {
                username,
                password,
                path
            });
        this.ctx.body = { error: res[0], result: res[1] };
    }

    async writeScenes() {

    }
}

module.exports = SettingsController;