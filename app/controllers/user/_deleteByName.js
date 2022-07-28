const log = global.App.require('lib/log');
const AppDB = global.App.require('models/app');

module.exports = async (request, h) => {
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