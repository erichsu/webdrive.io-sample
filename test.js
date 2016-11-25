var host = 'localhost';
var port = 6379;

const http = require('http');
const app = require('express')();
const redis = require('redis').createClient;
var httpService = http.createServer(app)
const io = require('socket.io')(httpService);
const EventEmitter = require('events');
const RedisAdapter = require('socket.io-redis');

var redisAdapter, adapter;

const opts = {
    host: host,
    port: port,
    detect_buffers: true
};
const pubClient = redis(opts);
const subClient = redis(opts);
const redisErrorHandler = (e) => {
    console.error(e);
    delete redisAdapter;
};
const createAdapter = () => {
    if (!redisAdapter) {
        redisAdapter = RedisAdapter({
            host: host,
            port: port,
            pubClient: pubClient,
            subClient: subClient
        });
        redisAdapter.prototype.on('error', redisErrorHandler);
        // redisAdapter.on('error', redisErrorHandler);
        adapter = io.adapter(redisAdapter);
        adapter.on('error', function(err) {
            debug('adapter error: ', err);
        });
        console.log('ready');
    }
};


pubClient.on('ready', createAdapter);
subClient.on('ready', createAdapter);

pubClient.on('error', redisErrorHandler);
subClient.on('error', redisErrorHandler);



process.on('uncaughtException', () => {
    console.log('haha');
});