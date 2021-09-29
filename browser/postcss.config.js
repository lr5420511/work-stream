'use strict';

const Px2remPP = require('postcss-pxtorem');

module.exports = {
    plugins: [
        new Px2remPP({
            propList: ['*'],
            rootValue: 30
        })
    ]
};