
module.exports = (app, options) ->
  conf = {config: {environment: {}}}
  
  DeepMerge = require("deep-merge")

  # TODO this merge seems to screw up javascript arrays, turning them into objects
  merge = DeepMerge((target, source, key) ->
    [].concat(target, source))

  Client = require('node-rest-client').Client
  client = new Client()

  app.get '/', (req, res) ->
    res.render("#{options.base}/views/index", conf)
    
  app.get '/entity', (req, res) ->
    # read in file "../yk-pagedata.json"
    client.get("http://localhost:8080/yk-pagedata.json", (data, response) ->
      # parsed response body as js object
      console.log("got data")
      console.log(data);
      console.log("end data")
      c = merge(data, conf)
      console.log("merged data: ")
      console.log(c)
      res.render("#{options.base}/views/entity", c)
    ).on('error', (err) ->
      console.log('something went wrong on the request', err.request.options);
    )

  app.get '/browse', (req, res) ->
    client.get("http://localhost:8080/yk-browsedata.json", (data, response) ->
      res.render("#{options.base}/views/browse", merge(data, conf))
    ).on('error', (err) ->
      console.log('something went wrong on the request', err.request.options);
    )


