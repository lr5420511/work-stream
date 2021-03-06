'use strict';

const each = require('async-series-each');

const AuthorizeService = require('../authorize-service');
const { appendLimit, removeLimit, writeLimit, queryLimit, queryLimits, queryTotal } = require('../access/access-limit');

class LimitService extends AuthorizeService {
    async appendLimit(name, icon, path, navigator, parentID, options) {
        const { username, password } = options;
        let error = !(await this.validate(username, password, options.path));
        if(error) return [error, '您没有权限新增权限实例，提升权限后重试'];
        [icon, path, parentID] = [icon, path, parentID].map(cur => cur || null);
        const parent = await queryLimit.call(this.app.mssql, parentID);
        error = !((parent && parent.navigator && !parent.parentID) || !parentID);
        if(error) return [error, '新增权限实例失败，提交的父导航权限不合法，请检查'];
        const id = await appendLimit.call(this.app.mssql, name, icon, path, navigator, parentID);
        return [error, { 
            id, 
            name, 
            icon: icon || '', 
            path: path || '', 
            navigator, 
            parentID: parentID || '' 
        }];
    }

    async removeLimit(id, options) {
        const { username, password, path } = options;
        let error = !(await this.validate(username, password, path));
        if(error) return [error, '您没有权限删除权限实例，提升权限后重试'];
        const limit = await queryLimit.call(this.app.mssql, id);
        error = !limit || (limit.navigator && !limit.parentID);
        if(error && limit) {
            const navigators = await queryLimits.call(
                this.app.mssql, true, 0, 
                await queryTotal.call(this.app.mssql, true)
            );
            error = await each(navigators).some(async cur => {
                cur = await queryLimit.call(this.app.mssql, cur.id);
                return cur.parentID === id;
            });
        }
        if(error) return [error, '删除权限实例失败，提交的权限是其他导航权限的父权限，请检查'];
        id = await removeLimit.call(this.app.mssql, id);
        return [error, id];
    }

    async writeLimit(id, name, icon, path, options) {
        const { username, password } = options;
        let error = !(await this.validate(username, password, options.path));
        if(error) return [error, '您没有权限编辑权限实例，提升权限后重试'];
        let limit = await queryLimit.call(this.app.mssql, id);
        error = !limit || (limit.navigator ? (limit.parentID || limit.path ? !path : path) : !path);
        if(error) return [error, '编辑权限实例失败，提交的权限路由在当前类别下不合法，请检查'];
        [icon, path] = [icon, path].map(cur => cur || null);
        limit = await writeLimit.call(this.app.mssql, id, name, icon, path);
        return [error, Object.assign(limit, {
            icon: limit.icon || '',
            path: limit.path || ''
        })];
    }

    async queryLimit(id, options) {
        const { username, password, path } = options;
        let error = !(await this.validate(username, password, path));
        if(error) return [error, '您没有权限查看权限明细，提升权限后重试'];
        const limit = await queryLimit.call(this.app.mssql, id);
        error = !limit;
        if(error) return [error, '指定的权限明细，不存在或找不到'];
        const parent = await queryLimit.call(this.app.mssql, limit.parentID);
        return [error, Object.assign(limit, {
            icon: limit.icon || '',
            path: limit.path || '',
            parentID: limit.parentID || '',
            parentName: parent ? parent.name : ''
        })];
    }

    async queryLimits(navigator, index, count, options) {
        const { username, password, path } = options;
        let error = !(await this.validate(username, password, path));
        if(error) return [error, '您没有权限获取权限集合，提升权限后重试'];
        const skip = index * count,
            total = await queryTotal.call(this.app.mssql, navigator),
            limits = await queryLimits.call(this.app.mssql, navigator, skip, count);
        return [error, {
            total,
            limits: limits.map(cur => Object.assign(cur, { path: cur.path || '' }))
        }];
    }

    async queryNavigators(options) {
        const { username, password, path } = options;
        let error = !(await this.validate(username, password, path));
        if(error) return [error, '您没有权限获取导航权限集合，提升权限后重试'];
        const navigators = await queryLimits.call(
            this.app.mssql, true, 0,
            await queryTotal.call(this.app.mssql, true)
        );
        await each(navigators).forEach(async cur => {
            const temp = await queryLimit.call(this.app.mssql, cur.id);
            cur.parentID = temp.parentID;
        });
        return [error, navigators.map(cur => 
            Object.assign(cur, { path: cur.path || '', parentID: cur.parentID || '' })
        )];
    }
}

module.exports = LimitService;