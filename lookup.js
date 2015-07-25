var fs = require('fs');
var path  = require('path');

module.exports = function(redis) {
    redis.defineCommand('lookup', {
        numberOfKeys: 2,
        lua: fs.readFileSync(path.resolve(__dirname, '../luaScripts/lookup.lua'), 'utf8')
    });
    return function(req, res, next) {
        var host = req.headers.host.split(':')[0];
        var path = req.url.split('?')[0];

        if (path === '/') path = 'index.html';

        redis.lookup(host, path)
        .then(function(result) {
            if (!result) next();
            else {
                var appId = result[0];
                var config = JSON.parse(result[1]);
                var file = {};
                for (var i = 0; i < result[2].length; i += 2) {
                    file[result[2][i]] = result[2][i + 1];
                }

                req.FASTACK.appId = appId;
                req.FASTACK.config = config;
                req.FASTACK.file = file;
                req.FASTACK.files = result[3][0].map(function(f) {return f.split(':').slice(2)[0]});

                next()
            }
        });
    }
};