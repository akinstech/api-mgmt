'use strict';
const os = require('os');
const path = require('path');

const Hapi = require('@hapi/hapi');
const HapiBasicAuth = require('@hapi/basic');

const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');

const HapiSwagger = require('hapi-swagger');

// Setup our globals
global.AppRoot = path.resolve(__dirname);
global.App = require('./app/lib/global');

const log = global.App.require('lib/log');
const Auth = global.App.require('lib/auth');

const args = process.argv;

if (args[2]) {
    global.App.name = args[2];
}

if (args[3]) {
    global.App.port = args[3];
} else {
    global.App.port = process.env.PORT;
}

log.debug('Logging facilities online.');
log.info(`${global.App.longName} (${global.App.name}) [Build ${global.App.build}] Started.`);

// Your code goes here:
//
//

// Import Route Definisitons
const rootRouter = global.App.require('routes/root');
const userRouter = global.App.require('routes/user');

const init = async () => {
    const server = Hapi.server({
        port: global.App.port,
        host: 'localhost',
    });

    // await server.register({
    //   plugin: require('hapi-pino'),
    //   options: {
    //     prettyPrint: {
    //       colorize: true,
    //     },
    //     // Redact Authorization headers, see https://getpino.io/#/docs/redaction
    //     redact: ['req.headers.authorization'],
    //   },
    // });

    const swaggerOptions = {
        info: {
            title: 'PayPI API Documentation',
            version: global.App.build,
        },
    };

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions,
        },
    ]);

    // Register basic authentication strategy  
    await server.register(HapiBasicAuth);
    server.auth.strategy('simple', 'basic', { validate: Auth.validate });

    server.route(rootRouter.routes);
    server.route(userRouter.routes);

    await server.start();
    log.info(`${global.App.name} is now listening at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    log.error(err);
    process.exit(1);
});

init();
// End of Code

log.info('Exit');
