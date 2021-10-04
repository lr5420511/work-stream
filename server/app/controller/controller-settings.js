'use strict';

const { Controller } = require('egg');

class SettingsController extends Controller {
    async queryAll() {
        const res = await this.service.serviceSettings.queryAll();
        if(!res) {
            this.ctx.throw('The global settings cann\'t be found.', 404);
            return;
        }
        this.ctx.body = res;
    }

    async writeColor() {

    }

    async writeScenes() {

    }
}

module.exports = SettingsController;