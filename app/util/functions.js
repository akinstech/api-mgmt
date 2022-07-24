const crypto = require('crypto');

async function generatePassword(length) {
    return crypto.randomBytes(length).toString('hex');
}

module.exports = {
    generatePassword,
}
