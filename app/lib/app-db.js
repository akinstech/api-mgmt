const config = global.App.require('classes/config');
const DB = global.App.require('classes/db-promise');

require('dotenv').config({
    path: './config/.env',
});

const db = new DB(
    process.env.DB_HOST,
    process.env.DB_USER,
    process.env.DB_PASS,
    process.env.DB_NAME,
    config.db.app.connectionLimit,
);

module.exports = db;