module.exports = (connect, options) ->
  express = require 'express'
  routes = require './routes'
  path = require 'path'
  app = express()

  mountFolder = (connect, dir) ->
    connect.static(require('path').resolve(dir))

  mountFolder(connect, (options.base + '/../pub'))
  
  app.configure ->
    app.set('views', (options.base + '/views'))
    app.set('view engine', 'jade')
    app.engine('.html', require('jade').__express)
    # app.set 'port'  (process.env.PORT || 8080)
    app.set('view options', { debug: true })

    app.use express.logger 'dev'
    app.use express.bodyParser()
    app.use express.methodOverride()
    app.use app.router
    app.use express.errorHandler()
    app.use express.static options.base

    app.use (err, req, res, next) -> 
      console.error(err.stack)
      res.send(500, 'Something broke!')

    routes app, options

  connect(app).stack
