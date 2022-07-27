const os = require('os');
const Joi = require('joi');

const config = global.App.require('classes/config');
const Controller = global.App.require('controllers/user');

const routes = [
    {
        method: 'POST',
        path: '/user/create',
        config: {
            auth: 'jwt',
            description: 'Create a new user',
            notes: 'Creates a new user based on supplied user object.',
            tags: ['api'],
            handler: Controller.create,
        },
        // validate: {
        //     payload: Joi.object({
        //         username: Joi.string(),
        //         email: Joi.string(),
        //         // description: Joi.string(),
        //         password: Joi.string(),
        //     }),
        // },
    },
    {
        method: 'POST',
        path: '/user/delete',
        config: {
            auth: 'jwt',
            description: 'Delete a user',
            notes: 'Deletes a user based on supplied username.',
            tags: ['api'],
            handler: Controller.deleteByName,
        },
        // validate: {
        //     payload: Joi.object({
        //         username: Joi.string(),
        //         email: Joi.string(),
        //         // description: Joi.string(),
        //         password: Joi.string(),
        //     }),
        // },
    },
];

module.exports = {
    routes,
};
