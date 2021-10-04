'use strict';

const koaStatic = require('koa-static');

module.exports = options => koaStatic(options.path, {  
    index: options.default
});