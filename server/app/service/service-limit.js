'use strict';

const AuthorizeService = require('../authorize-service');
const Mssql = require('mssql');

class LimitService extends AuthorizeService {
    async appendLimit(name, path, navigator, parentID, options) {

    }

    async removeLimit(id, options) {

    }

    async writeLimit(id, name, path, options) {

    }

    async queryLimit(id, options) {

    }

    async queryLimits(navigator, index, count, options) {

    }
}

module.exports = LimitService;