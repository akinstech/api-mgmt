const os = require('os');

const log = global.App.require('lib/log');
const AppDB = global.App.require('models/app');
const Auth = global.App.require('lib/auth');
const fn = global.App.require('util/functions');

const create = async (request, h) => {
    const { username, email, password, rounds } = request.payload;

    log.info(`Requesting to create user [${username}]`);

    // If rounds was specified, use that, otherwise use the default
    let hashRounds = global.App.account.password.rounds;
    if (rounds >= 6 && rounds <= 18) {
        hashRounds = rounds;
    }
    log.info(`hashRounds set to ${hashRounds} for user ${username}`);

    // If password was specified, use that, otherwise generate one.
    let userPassword;
    if (password) {
        userPassword = password;
    } else {
        userPassword = await fn.generatePassword(global.App.account.password.defaultLength);
    }
    console.log(typeof userPassword, userPassword);
    try {
        // Check if user exists
        const queriedUser = await AppDB.getUserByName(username);
        if (queriedUser) {
            log.warn(`User ${username} is already in use`);
            return h.response(`User already exists`).code(422);
        }

        log.info(`User ${username} is available`)
        const user = {
            username,
            email,
            password: await Auth.hash(userPassword, hashRounds),
        }

        // Create user
        await AppDB.createUser(user);
        return {
            user: username,
            password: (!password) ? userPassword : null,
        };
    } catch (err) {
        log.error(err);
        throw err;
    }
};

const deleteByName = async (request, h) => {
    const { username } = request.payload;
    log.info(`Requesting to delete user [${username}]`);

    try {
        // Check if user exists
        const queriedUser = await AppDB.getUserByName(username);
        if (!queriedUser) {
            log.warn(`User ${username} does not exist`);
            return h.response(`User does not exist`).code(404);
        }

        log.info(`User ${username} exists`)

        // Delete user
        await AppDB.deleteUser(queriedUser.id);
        return `User ${username} has been deleted`;

    } catch (err) {
        log.error(err);
        throw err;
    }
};

module.exports = {
    create,
    deleteByName,
};
