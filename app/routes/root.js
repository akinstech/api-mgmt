const os = require('os');
const Joi = require('joi');

const config = global.App.require('classes/config');
const Controller = global.App.require('controllers/root');

const routes = [

    // GET: /test
    {
        method: 'GET',
        path: '/test',
        config: {
            description: 'Diagnostic Test (Non-Authenticated)',
            notes: 'Performs a basic diagnostic test to confirm operation of the API.  Does not require authentication.  Useful for testing and monitoring.',
            tags: ['api'],
            handler: Controller.test,
        },
    },

    // GET: /testauth
    {
        method: 'GET',
        path: '/testauth',
        config: {
            auth: 'simple',
            description: 'Diagnostic Test (Authenticated)',
            notes: 'Performs a basic diagnostic test to confirm operation of the API.  Requires authentication.  Useful for testing and monitoring.',
            tags: ['api'],
            handler: Controller.test,
        },
    },

    // GET: /systeminfo
    {
        method: 'GET',
        path: '/systeminfo',
        config: {
            auth: 'simple',
            description: 'System Information (Authenticated)',
            notes: 'Performs a basic diagnostic test and returns configuration information.',
            tags: ['api'],
            handler: Controller.systemInfo,
        },
    },
];

module.exports = {
    routes,
};
