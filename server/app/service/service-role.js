'use strict';

const AuthorizeService = require('../authorize-service');
const { appendRole, removeRole, writeRole, queryRole, queryRoles, queryTotal } = require('../access/access-role');

class RoleService extends AuthorizeService {
    async appendRole(name, description, options) {
        const { username, password, path } = options;
        let error = !(await this.validate(username, password, path));
        if(error) return [error, '您没有权限新增角色实例，提升权限后重试'];
        const id = await appendRole.call(this.app.mssql, name, description);
        return [error, { id, name, description }];
    }

    async removeRole(id, options) {
        const { username, password, path } = options;
        let error = !(await this.validate(username, password, path));
        if(error) return [error, '您没有权限删除角色实例，提升权限后重试'];
        id = await removeRole.call(this.app.mssql, id);
        return [error, id];
    }

    async writeRole(id, name, description, options) {
        const { username, password, path } = options;
        let error = !(await this.validate(username, password, path));
        if(error) return [error, '您没有权限编辑角色实例，提升权限后重试'];
        const role = await writeRole.call(this.app.mssql, id, name, description);
        return [error, { 
            id: role.id, 
            name: role.name, 
            description: role.description 
        }];
    }

    async queryRole(id, options) {
        const { username, password, path } = options;
        let error = !(await this.validate(username, password, path));
        if(error) return [error, '您没有权限查看角色明细，提升权限后重试'];
        const role = await queryRole.call(this.app.mssql, id);
        error = !role;
        if(error) return [error, '指定的角色明细，找不到或不存在'];
        return [error, { id, name: role.name, description: role.description }];
    }

    async queryRoles(name, index, count, options) {
        const { username, password, path } = options;
        let error = !(await this.validate(username, password, path));
        if(error) return [error, '您没有权限获取角色集合，提升权限后重试'];
        const skip = index * count,
            total = await queryTotal.call(this.app.mssql, name),
            roles = await queryRoles.call(this.app.mssql, name, skip, count);
        return [
            error, 
            { 
                total, 
                roles: roles.map(role => ({ id: role.id, name: role.name, description: role.description })) 
            }
        ];
    }
}

module.exports = RoleService;