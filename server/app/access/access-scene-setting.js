'use strict';

const Mssql = require('mssql');

const outs = exports;

outs.queryScenes = async function() {
    const res = await this.query('select scene from SceneSetting');
    return res.recordset;
};

outs.appendScene = async function(scene) {
    await this.request()
        .input('scene', Mssql.NVarChar(60), scene)
        .query('insert into SceneSetting values(@scene)');
    return scene;
};

outs.removeScene = async function(scene) {
    await this.request()
        .input('scene', Mssql.NVarChar(60), scene)
        .query('delete from SceneSetting where scene = @scene');
    return scene;
};