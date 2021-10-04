'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
    static: {
        enable: false,
        package: 'egg-static'
    },
    mssql: {
        enable: true,
        package: 'egg-mssql'
    }
};
