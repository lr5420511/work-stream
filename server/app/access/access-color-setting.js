'use strict';

const Mssql = require('mssql');

const outs = exports;

outs.queryColor = async function() {
    const res = await this.query('select color from ColorSetting');
    return res.recordset[0];
};

outs.writeColor = async function(color) {
    await this.request()
        .input('color', Mssql.NVarChar(30), color)
        .query('update ColorSetting set color = @color');
    return color;
};