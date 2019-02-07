/* eslint-env node */

const Server = require('../server');
const isCI = !!process.env.ENV_CI;
let HTTPServer;

exports.config = {
    specs: ['./test-integration/specs/**/*.spec.js'],
    maxInstances: 10,
    capabilities: [{
        maxInstances: 5,
        browserName: 'chrome',
        chromeOptions: { args: ['headless', 'disable-gpu']},
    }],
    sync: true,
    logLevel: 'silent',
    coloredLogs: true,
    bail: 0,
    screenshotPath: './errorShots/',
    baseUrl: 'http://localhost',
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    services: isCI ? [] : ['selenium-standalone'],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd'
    },
    onPrepare () {
        return Server.start().then(server => {
            HTTPServer = server;
        });
    },
    onComplete() {
        HTTPServer.close();
    }
};
