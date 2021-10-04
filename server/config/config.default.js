/* eslint valid-jsdoc: "off" */

'use strict';

const { resolve } = require('path');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1633341955471_3808';

  // add your middleware config here
  config.middleware = ['mwStatic'];

  // koa-static options
  config.mwStatic = {
      path: resolve(__dirname, '../app/public'),
      default: 'index.html'
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
      mssql: {
          client: {
              server: '127.0.0.1',
              user: 'sa',
              password: '123',
              database: 'WorkStream'
          }
      }
  };

  return {
    ...config,
    ...userConfig,
  };
};
