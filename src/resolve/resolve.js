var _ = require('lodash');
var Path = require('path');
var mime = require('mime');

module.exports = function(getFile) {
    return function(req, res, next) {
        var files = req.FASTACK.files || [];
        var routed = req.FASTACK.routed;
        var appId = req.FASTACK.appId;

        if (routed) {
            switch(routed.type) {
                case 'file':
                    if (_.contains(files, routed.path)) {
                        getFile(routed.path, appId)
                        .then(function(file) {
                            res.setHeader({
                                'Content-Type': mime.lookup(routed.path)
                            });
                            res.end(file.contents, 'binary');
                            next();
                        });
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
        else {
            next()
        }
    }
};