module.exports = function() {
    return function(req, res, next) {
       // TODO: allow 404s to be configurable
       // return a specific file or redirect somewhere
       res.writeHead(404);
       res.end('Page not found...');
    }
};