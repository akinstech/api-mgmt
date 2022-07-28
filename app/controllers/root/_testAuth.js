const os = require('os');
const log = global.App.require('lib/log');

async function testAuth(request, h) {
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

module.exports = testAuth;
