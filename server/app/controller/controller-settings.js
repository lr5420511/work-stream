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

    async appendScene() {
        const { username, password } = this.ctx.query,
            path = this.ctx.path,
            reader = await this.ctx.getFileStream(),
            res = await this.service.serviceSettings.appendScene(reader, {
                username,
                password,
                path
            });
        this.ctx.body = { error: res[0], result: res[1] };
    }

    async removeScene() {
        const { username, password, path } = this.ctx.query,
            cpath = this.ctx.path,
            res = await this.service.serviceSettings.removeScene(path, {
                username,
                password,
                path: cpath
            });
        this.ctx.body = { error: res[0], result: res[1] };
    }
}

module.exports = SettingsController;