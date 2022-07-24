const os = require('os');
const path = require('path');

const config = require(`${global.AppRoot}/config/appconfig.json`);

require('dotenv').config({
  path: `${global.AppRoot}/config/.env`,
});

const app = {
  root: global.AppRoot,
  configPath: `${global.AppRoot}/config/`,
  hostName: os.hostname(),
  appInstance: process.env.pm_id,
  debug: process.env.DEBUG,
  env: process.env,
  packageJson: require(`${global.AppRoot}/package.json`),
  appPath: {},
  require: {},
  log: config.log,
  mailer: config.mailer,
  account: config.account,
};

app.build = app.packageJson.version;
app.name = app.packageJson.name;
app.longName = app.packageJson.description;

app.appPath = (dir) => path.join(app.root, '/app/', dir);
app.require = (p) => require(app.appPath(p));

module.exports = app;
