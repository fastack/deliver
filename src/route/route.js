var mm = require('micromatch');
var Path = require('path');

module.exports = function() {
    return function(req, res, next) {
        var config = req.FASTACK.config;
        var routes = config.routes;
        var path = req.url.split('?')[0].replace(/^\//g, '');

        //if (path === '') path = '/';

        if (Path.extname(path) !== '') { // if request has file extension in it
            req.FASTACK.routed = {
                type: 'file',
                path: path
            }
        }

        // first see if requested path is defined as a route
        for (var route in routes) {
            var file = routes[route];
            if (mm.isMatch('/'+path, route)) {
                req.FASTACK.routed = {
                    type: 'file',
                    path: file
                };
            }
        }

        // redirects
        var redirects = config.redirects;

        for (var redirect in redirects) {
            var location, code;
            if (typeof redirects[redirect] === 'object') {
                location = redirects[redirect]['location'];
                code = redirects[redirect]['code'];
            } else {
                location = redirects[redirect];
                code = 302;
            }
            if (mm.isMatch('/'+path, redirect)) {
                req.FASTACK.routed = {
                    type: 'redirect',
                    code: code,
                    path: location
                };
            }
        }

        if (!req.FASTACK.routed) req.FASTACK.notFound = true;

        next();
    }
};