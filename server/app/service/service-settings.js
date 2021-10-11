'use strict';

const { EventEmitter } = require('events');
const { join } = require('path');
const { createWriteStream, unlink } = require('fs');

const AuthorizeService = require('../authorize-service');
const Mssql = require('mssql');
const promiseify = require('new-promiseify');

const [once, rmFile] = promiseify(
    EventEmitter.prototype.once,
    unlink
);

class SettingsService extends AuthorizeService {
    async queryAll() {
        let colors = await this.app.mssql.query('select color from ColorSetting'),
            scenes = await this.app.mssql.query('select scene from SceneSetting'),
            error;
        [colors, scenes] = [colors, scenes].map(cur => cur.recordset);
        error = !(colors.length && scenes.length);
        return [
            error,
            error ? '全局设置不存在或找不到' : {
                color: colors[0].color,
                scenes: scenes.map(scene => scene.scene)
            }
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
        ).query('update ColorSetting set color = @color');
        return [error, color];
    }

    async appendScene(reader, options) {
        const { username, password, path } = options;
        let error = !(await this.validate(username, password, path));
        if(error) return [error, '您没有权限上传场景图片，提升权限后重试'];
        const exts = reader.filename.match(/\.[^\.\n]+$/),
            [filename, publicdir, scenesdir] = [
                `${Date.now()}-${Math.floor(Math.random() * Math.pow(10, 9))}${exts ? exts[0] : ''}`,
                this.app.config.mwStatic.path,
                this.app.config.SCENES_DIRECTORY_PATH
            ],
            writer = createWriteStream(join(publicdir, scenesdir, filename));
        reader.pipe(writer);
        await once.call(writer, 'finish');
        const relative = join(scenesdir, filename);
        await this.app.mssql.request().input(
            'scene',
            Mssql.NVarChar(60),
            relative
        ).query('insert into SceneSetting values(@scene)');
        return [error, relative];
    }

    async removeScene(path, options) {
        const { username, password } = options;
        let error = !(await this.validate(username, password, options.path));
        if(error) return [error, '您没有权限删除场景图片，提升权限后重试'];
        const publicdir = this.app.config.mwStatic.path;
        await rmFile(join(publicdir, path));
        await this.app.mssql.request().input(
            'scene',
            Mssql.NVarChar(60),
            path
        ).query('delete from SceneSetting where scene = @scene');
        return [error, path];
    }
}

module.exports = SettingsService;