'use strict';

const Mssql = require('mssql');

const outs = exports;

outs.appendRole = async function(name, description) {
    const res = await this.request()
        .input('name', Mssql.NVarChar(30), name)
        .input('description', Mssql.NVarChar(300), description)
        .query('insert into Role values(@name, @description);select @@IDENTITY as id');
    return res.recordset[0].id;
};

outs.removeRole = async function(id) {
    await this.request()
        .input('id', Mssql.BigInt, id)
        .query('delete from Role where id = @id');
    return id;
};

outs.writeRole = async function(id, name, description) {
    await this.request()
        .input('id', Mssql.BigInt, id)
        .input('name', Mssql.NVarChar(30), name)
        .input('description', Mssql.NVarChar(300), description)
        .query('update Role set name = @name, description = @description where id = @id');
    return { id, name, description };
};

outs.queryRole = async function(id) {
    const res = await this.request()
        .input('id', Mssql.BigInt, id)
        .query('select * from Role where id = @id');
    return res.recordset[0];
};

outs.queryRoles = async function(name, skip, count) {
    const res = await this.request()
        .input('name', Mssql.NVarChar(32), `%${name}%`)
        .input('skip', Mssql.BigInt, skip)
        .input('count', Mssql.BigInt, count)
        .query('select top (@count) id, name, description from Role where name like @name and id not in (select top (@skip) id from Role where name like @name)');
    return res.recordset;
};

outs.queryTotal = async function(name) {
    const res = await this.request()
        .input('name', Mssql.NVarChar(32), `%${name}%`)
        .query('select count(*) as count from Role where name like @name');
    return res.recordset[0].count;
};

