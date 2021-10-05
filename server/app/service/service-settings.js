'use strict';

const AuthorizeService = require('../authorize-service');

class SettingsService extends AuthorizeService {
    async queryAll() {
        const { recordset } = await this.app.mssql.query('select * from settings');
        return recordset.map(record => ({
            color: record.color,
            scenes: record.scenes.match(/[^\|\n]+/g) || []
        }))[0];
    }

    async writeColor(color, options) {
        const { username, password, path } = options,
            valid = await this.validate(username, password, path);
        return valid && await this.app.mssql.query(`update settings set color = \'${color}\'`);
    }

    async writeScenes() {

    }
}

module.exports = SettingsService;