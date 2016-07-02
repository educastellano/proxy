var node_static = require('node-static')
var http        = require('http')
var request     = require('request')
var minimatch   = require('minimatch')
var emoji       = require('node-emoji')
var envs        = require('./env.json')

var proxy = function(options) {
    this.env    = options.env
    this.static = options.static
}
proxy.prototype.start = function(host, port) {
    this.host = host
    this.port = port
    this.startServer(host, port)
}
proxy.prototype.isProxy = function(req) {
    return envs.routes.reduce(function(res, route) {
        if (minimatch(req.url, route)) res = true
        return res
    }, false)
},
proxy.prototype.proxyRequest = function(req, res) {
    var options = {
        method  : req.method,
        url     : envs[this.env].uri+req.url
    }
    request(options, function(err, proxyResponse, body) {
            res.write(body || '')
            res.end()
        })
}
proxy.prototype.respondDefault = function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('okay');
}
proxy.prototype.startServer = function(host, port) {
    var file; if (this.static) file = new node_static.Server(this.static)
    require('http').createServer(function (req, res) {
        if (this.isProxy(req)) this.proxyRequest(req, res)
        else if (file) file.serve(req, res)
        else this.respondDefault(req, res)
    }.bind(this)).listen(port, host, function() {
        console.log('Proxy up at '+host+':'+port+' '+emoji.get(':rocket:'))
    }.bind(this));
}

module.exports = function(options) {
    return new proxy(options)
}
