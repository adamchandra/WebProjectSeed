
module.exports = (app, options) ->
  conf = {config: {environment: {}}}
  
  extend = require("xtend")
  rest = require('restler');

  app.get '/', (req, res) ->
    res.render("#{options.base}/views/index", conf)
    
  app.get '/entity', (req, res) ->
    rest.get('http://localhost:8088/api/entity/0')
      .on 'success', (data, response) ->
        # parsed response body as js object
        #console.log("got data")
        #console.log(typeof(data))
        #console.log(data)
        #console.log("got response")
        #console.log(typeof(response))
        #console.log(response)
        #console.log("end data")
        c = extend(conf, data)
        console.log("*** merged data")
        console.log(c)
        res.render("#{options.base}/views/entity", c)
      .on 'error', (err) ->
        console.log('An error occurred:' + err)

  app.get '/browse', (req, res) ->
    rest.get('http://localhost:8088/api/entities')
      .on 'success', (data, response) ->
        c = extend(conf, data)
        console.log("*** merged data")
        console.log(c)
        res.render("#{options.base}/views/browse", c)
      .on 'error', (err) ->
        console.log('An error occurred:' + err)

  app.get '/topic', (req, res) ->
    rest.get('http://localhost:8088/api/topic/0')
      .on 'success', (data, response) ->
        c = extend(conf, data)
        console.log("*** merged data")
        console.log(c)
        res.render("#{options.base}/views/topic", c)
      .on 'error', (err) ->
        console.log('An error occurred:' + err)



