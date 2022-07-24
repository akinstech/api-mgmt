const util = require('util');

const log = global.App.require('lib/log');
const DB = global.App.require('lib/app-db');

/**
 * Get a single user by UserName
 */
async function getUserByName(username) {
    try {
        const user = await DB.callProcedure('spGetUserByName', [username]);
        if (user) return user;
        return null;
    } catch (err) {
        log.error(err);
        throw err;
    }
}

/**
 * Create a user
 */
async function createUser(user) {
    try {
        await DB.callProcedure('spAddUser', [
            user.username,
            user.email,
            user.password,
        ]);
        return true;
    } catch (err) {
        log.error(err);
        throw err;
    }
}

/**
 * Delete a user
 */
async function deleteUser(userid) {
    try {
        await DB.callProcedure('spDeleteUser', [userid]);
        return true;
    } catch (err) {
        log.error(err);
        throw err;
    }
}

module.exports = {
    getUserByName,
    createUser,
    deleteUser,
};