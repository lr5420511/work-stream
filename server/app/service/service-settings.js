'use strict';

const AuthorizeService = require('../authorize-service');
const Mssql = require('mssql');

class SettingsService extends AuthorizeService {
    async queryAll() {
        const res = await this.app.mssql.query('select * from settings'),
            first = res.recordset.map(record => ({
                color: record.color,
                scenes: record.scenes.match(/[^\|\n]+/g) || []
            }))[0];
        return [
            !first,
            first || '全局设置找不到或不存在'
        ];
    }

    async writeColor(color, options) {
        const { username, password, path } = options;
        let error = !(await this.validate(username, password, path));
        if(error) return [error, '您没有权限编辑系统颜色，提升权限后重试'];
        await this.app.mssql.request().input(
            'color',
            Mssql.NVarChar(30),
            color
        ).query('update settings set color = @color');
        return [error, color];
    }

    async writeScenes() {

    }
}

module.exports = SettingsService;