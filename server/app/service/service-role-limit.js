'use strict';

const each = require('async-series-each');

const AuthorizeService = require('../authorize-service');
const { queryLimit } = require('../access/access-limit');
const { queryRole } = require('../access/access-role');
const { appendRoleLimit, removeRoleLimit, queryRoleLimits } = require('../access/access-role-limit');

class RoleLimitService extends AuthorizeService {
    async queryLimits(roleID, navigator, options) {
        const { username, password, path } = options;
        let error = !(await this.validate(username, password, path));
        if(error) return [error, `您没有权限查询指定角色的${navigator ? '导航' : '操作'}模式权限，提升权限后重试`];
        const role = await queryRole.call(this.app.mssql, roleID);
        error = !role;
        if(error) return [error, '指定的角色没有找到或不存在'];
        const limitIDs = await each(await queryRoleLimits.call(this.app.mssql, roleID))
            .reduce(async (res, cur) => {
                cur = await queryLimit.call(this.app.mssql, cur.limitID);
                cur && (cur.navigator === navigator) && res.push(cur.id);
                return res;
            }, []);
        return [error, { roleID, limitIDs }];
    }

    async authorizeLimits(roleID, limitIDs, navigator, options) {
        const { username, password, path } = options;
        let error = !(await this.validate(username, password, path));
        if(error) return [error, `您没有权限授权指定角色${navigator ? '导航' : '操作'}模式权限，提升权限后重试`];
        const role = await queryRole.call(this.app.mssql, roleID);
        error = !role;
        if(error) return [error, '指定的角色没有找到或不存在'];
        await each(await queryRoleLimits.call(this.app.mssql, roleID))
            .forEach(async cur => {
                const limit = await queryLimit.call(this.app.mssql, cur.limitID),
                    removable = limit && limit.navigator === navigator;
                removable && (await removeRoleLimit.call(this.app.mssql, cur.id));
            });
        limitIDs = await each(limitIDs).filter(async id => {
            const limit = await queryLimit.call(this.app.mssql, id),
                valid = limit && limit.navigator === navigator;
            valid && (await appendRoleLimit.call(this.app.mssql, roleID, id));
            return valid;
        });
        return [error, { roleID, limitIDs }];
    }
}

module.exports = RoleLimitService;