const Bcrypt = require('bcrypt');
const AppDB = global.App.require('models/app');
const log = global.App.require('lib/log');

// Hash password
const hash = async (password, rounds) => {
    return await Bcrypt.hash(password, rounds);
}

// Basic authentication scheme
const validate = async (request, username, password) => {
    log.info(`Validating user ${username}`);
    try {
        // Retrieve user
        const user = await AppDB.getUserByName(username);
        if (!user) {
            log.info(`User ${username} does not exist`);
            return { credentials: null, isValid: false };
        }

        const isValid = await Bcrypt.compare(password, user.password);
        const credentials = { id: user.id, name: user.name };

        return { isValid, credentials };
    } catch (err) {
        log.error(err);
        throw err;
    }

};

module.exports = {
    hash,
    validate,
}