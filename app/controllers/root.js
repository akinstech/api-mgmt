const os = require('os');

const log = global.App.require('lib/log');

const test = async (request, h) => {
    try {
        const result = {
            instance: global.App.name,
            version: global.App.packageJson.version,
            server: os.hostname(),
            port: global.App.port,
            status: 'up',
        };
        return result;
    } catch (err) {
        log.error(err);
        throw err;
    }
};

const testAuth = async (request, h) => {
    try {
        const result = {
            instance: global.App.name,
            version: global.App.packageJson.version,
            server: os.hostname(),
            port: global.App.port,
            status: 'up',
            user: request.auth.credentials.name,
        };

        return result;
    } catch (err) {
        log.error(err);
        throw err;
    }
};

const systemInfo = async (request, h) => {
    try {
        const result = {
            instance: global.App.name,
            version: global.App.packageJson.version,
            server: os.hostname(),
            port: global.App.port,
            status: 'up',
            user: request.auth.credentials.name,
            api: {
                type: global.App.config.api.type,
                timeout: global.App.config.api.timeout,
                retryDelay: global.App.config.api.retryDelay,
                maxAttempts: global.App.config.api.maxAttempts,
            },
            db2url: global.App.env.DB2_SERVICE_HOST,
            db2port: global.App.env.DB2_SERVICE_PORT,
            db2user: global.App.env.DB2_SERVICE_USER,
            apiservice: global.App.api,
        };

        return result;
    } catch (err) {
        log.error(err);
        throw err;
    }
};

module.exports = {
    test,
    testAuth,
    systemInfo,
};
