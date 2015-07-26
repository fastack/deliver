var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var defaultConfigPath = path.join(__dirname, 'defaultConfig.json');
var defaultConfig = JSON.parse(fs.readFileSync(defaultConfigPath, 'utf8'));

module.exports = function(env) {
    var env = env || 'development';
    return function(req, res, next) {
        var config = _.merge({
            env: env
        }, defaultConfig, req.FASTACK.config || {});
        req.FASTACK.config = config;
        next();
    }
};