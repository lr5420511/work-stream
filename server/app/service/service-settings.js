'use strict';

const { EventEmitter } = require('events');
const { join } = require('path');
const { createWriteStream, unlink } = require('fs');

const AuthorizeService = require('../authorize-service');
const promiseify = require('new-promiseify');

const { queryColor, writeColor } = require('../access/access-color-setting');
const { queryScenes, appendScene, removeScene } = require('../access/access-scene-setting');

const [once, rmFile] = promiseify(
    EventEmitter.prototype.once,
    unlink
);

class SettingsService extends AuthorizeService {
    async queryAll() {
        const { mssql } = this.app,
            [color, scenes] = [await queryColor.call(mssql), await queryScenes.call(mssql)],
            error = !(color && scenes.length);
        return [error, error ? '全局设置不存在或找不到' : {
            color: color.color,
            scenes: scenes.map(scene => scene.scene)
        }];
    }

    async writeColor(color, options) {
        const { username, password, path } = options;
        let error = !(await this.validate(username, password, path));
        if(error) return [error, '您没有权限编辑系统颜色，提升权限后重试'];
        color = await writeColor.call(this.app.mssql, color);
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
        let relative = join(scenesdir, filename);
        relative = await appendScene.call(this.app.mssql, relative);
        return [error, relative];
    }

    async removeScene(path, options) {
        const { username, password } = options;
        let error = !(await this.validate(username, password, options.path));
        if(error) return [error, '您没有权限删除场景图片，提升权限后重试'];
        const publicdir = this.app.config.mwStatic.path;
        await rmFile(join(publicdir, path));
        path = await removeScene.call(this.app.mssql, path);
        return [error, path];
    }
}

module.exports = SettingsService;