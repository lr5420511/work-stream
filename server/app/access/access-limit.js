'use strict';

const Mssql = require('mssql');

const outs = exports;

outs.appendLimit = async function(name, icon, path, navigator, parentID) {
    const res = await this.request()
        .input('name', Mssql.NVarChar(30), name)
        .input('icon', Mssql.NVarChar(50), icon)
        .input('path', Mssql.NVarChar(300), path)
        .input('navigator', Mssql.Bit, Number(navigator))
        .input('parentID', Mssql.BigInt, parentID)
        .query('insert into Limit values(@name, @icon, @path, @navigator, @parentID);select @@IDENTITY as id');
    return res.recordset[0].id;
};

outs.removeLimit = async function(id) {
    await this.request()
        .input('id', Mssql.BigInt, id)
        .query('delete from Limit where id = @id');
    return id;
};

outs.writeLimit = async function(id, name, icon, path) {
    await this.request()
        .input('id', Mssql.BigInt, id)
        .input('name', Mssql.NVarChar(30), name)
        .input('icon', Mssql.NVarChar(50), icon)
        .input('path', Mssql.NVarChar(300), path)
        .query('update Limit set name = @name, icon = @icon, path = @path where id = @id');
    return { id, name, icon, path };
};

outs.queryLimit = async function(id) {
    const res = await this.request()
        .input('id', Mssql.BigInt, id)
        .query('select * from Limit where id = @id');
    return res.recordset[0];
};

outs.queryLimits = async function(navigator, skip, count) {
    const res = await this.request()
        .input('navigator', Mssql.Bit, Number(navigator))
        .input('skip', Mssql.BigInt, skip)
        .input('count', Mssql.BigInt, count)
        .query('select top (@count) id, name, path from Limit where navigator = @navigator and id not in (select top (@skip) id from Limit where navigator = @navigator)');
    return res.recordset;
};

outs.queryTotal = async function(navigator) {
    const res = await this.request()
        .input('navigator', Mssql.Bit, Number(navigator))
        .query('select count(*) as count from Limit where navigator = @navigator');
    return res.recordset[0].count;
};