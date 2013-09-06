module.exports = function(connect, options) {
  var app, express, path, routes;
  express = require('express');
  routes = require('./routes');
  path = require('path');
  app = express();
  app.configure(function() {
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.errorHandler());
    app.use(express["static"](options.base));
    app.use(app.router);
    return routes(app, options);
  });
  return connect(app).stack;
};
