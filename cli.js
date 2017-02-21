#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2), {
    default : {
        host   : '127.0.0.1',
        port   : 8080,
        url    : 'http://localhost:9000',
        routes : [
            "/api/**"
        ]
    }
})

require('./index')(argv).start(argv.host, argv.port)
