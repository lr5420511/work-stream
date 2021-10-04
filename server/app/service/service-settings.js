'use strict';

const { Service } = require('egg');

class SettingsService extends Service {
    async queryAll() {
        const { recordset } = await this.app.mssql.query('select * from settings');
        return recordset.map(record => ({
            color: record.color,
            scenes: record.scenes.match(/[^\|\n]+/g) || []
        }))[0];
    }

    async writeColor() {

    }

    async writeScenes() {

    }
}

module.exports = SettingsService;