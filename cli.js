#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2), {
    default : {
        host : '127.0.0.1',
        port : 9000,
        env  : 'development'
    }
})

require('./index')(argv).start(argv.host,argv.port)