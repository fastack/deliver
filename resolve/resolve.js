var _ = require('lodash');
var Path = require('path');
var mime = require('mime');

module.exports = function(redis) {
    return function(req, res, next) {
        var files = req.FASTACK.files || [];
        var routed = req.FASTACK.routed;
        var appId = req.FASTACK.appId;

        switch(routed.type) {
            case 'file':
                if (_.contains(files, routed.path)) {
                   // get the file
                    next();
                } else {
                    next();
                }
                break;
            case 'redirect':
                res.writeHead(routed.code, {
                    'Location': routed.path
                });
                next();
                break;
        }
    }
};