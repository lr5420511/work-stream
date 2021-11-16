'use strict';

const Mssql = require('mssql');

const outs = exports;

outs.appendRoleLimit = async function(roleID, limitID) {
    const res = await this.request()
        .input('roleID', Mssql.BigInt, roleID)
        .input('limitID', Mssql.BigInt, limitID)
        .query('insert into RoleLimit values(@roleID, @limitID);select @@IDENTITY as id');
    return res.recordset[0].id;
};

outs.removeRoleLimit = async function(id) {
    await this.request()
        .input('id', Mssql.BigInt, id)
        .query('delete from RoleLimit where id = @id');
    return id;
};

outs.queryRoleLimits = async function(roleID) {
    const res = await this.request()
        .input('roleID', Mssql.BigInt, roleID)
        .query('select * from RoleLimit where roleID = @roleID');
    return res.recordset;
};