'use strict';

const AuthorizeService = require('../authorize-service');
const Mssql = require('mssql');

class RoleService extends AuthorizeService {
    async appendRole(name, description, options) {
        const { username, password, path } = options;
        let error = !(await this.validate(username, password, path));
        if(error) return [error, '您没有权限新增角色实例，提升权限后重试'];
        const { recordset } = await this.app.mssql.request()
            .input('name', Mssql.NVarChar(30), name)
            .input('description', Mssql.NVarChar(300), description)
            .query('insert into Role values(@name, @description);select @@IDENTITY as id');
        return [error, { id: recordset[0].id, name, description }];
    }

    async removeRole(id, options) {
        const { username, password, path } = options;
        let error = !(await this.validate(username, password, path));
        if(error) return [error, '您没有权限删除角色实例，提升权限后重试'];
        await this.app.mssql.request()
            .input('id', Mssql.BigInt, id)
            .query('delete from Role where id = @id');
        return [error, id];
    }

    async writeRole(id, name, description, options) {
        const { username, password, path } = options;
        let error = !(await this.validate(username, password, path));
        if(error) return [error, '您没有权限编辑角色实例，提升权限后重试'];
        await this.app.mssql.request()
            .input('id', Mssql.BigInt, id)
            .input('name', Mssql.NVarChar(30), name)
            .input('description', Mssql.NVarChar(300), description)
            .query('update Role set name = @name, description = @description where id = @id');
        return [error, { id, name, description }];
    }

    async queryRole(id, options) {
        const { username, password, path } = options;
        let error = !(await this.validate(username, password, path));
        if(error) return [error, '您没有权限查看角色明细，提升权限后重试'];
        const { recordset } = await this.app.mssql.request()
            .input('id', Mssql.BigInt, id)
            .query('select * from Role where id = @id');
        error = !recordset.length;
        if(error) return [error, '指定的角色明细，找不到或不存在'];
        const role = recordset[0];
        return [error, { id, name: role.name, description: role.description }];
    }

    async queryRoles(name, index, count, options) {
        const { username, password, path } = options;
        let error = !(await this.validate(username, password, path));
        if(error) return [error, '您没有权限获取角色集合，提升权限后重试'];
        const skip = index * count,
            total = (await this.app.mssql.request()
                .input('name', Mssql.NVarChar(32), `%${name}%`)
                .query('select count(*) as count from Role where name like @name'))
                .recordset[0].count,
            roles = (await this.app.mssql.request()
                .input('name', Mssql.NVarChar(32), `%${name}%`)
                .input('skip', Mssql.BigInt, skip)
                .input('count', Mssql.BigInt, count)
                .query('select top (@count) id, name, description from Role where name like @name and id not in (select top (@skip) id from Role where name like @name)'))
                .recordset;
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