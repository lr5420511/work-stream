'use strict';

const { Controller } = require('egg');

class SettingsController extends Controller {
    async queryAll() {
        const settings = await this.service.serviceSettings.queryAll();
        this.ctx.body = {
            error: !settings,
            result: settings || 'The global settings isn\'t exist.'
        };
    }

    async writeColor() {
        const { username, password, color } = this.ctx.query,
            path = this.ctx.path,
            res = await this.service.serviceSettings.writeColor(color, {
                username,
                password,
                path
            });
        this.ctx.body = {
            error: !res,
            result: res ? color : '对不起，您没有编辑系统颜色的权限'
        };
    }

    async writeScenes() {

    }
}

module.exports = SettingsController;