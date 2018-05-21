'use strict';

const Router = require('koa-router');
const UserController = require('./controllers/User');
const session = require('koa-session');
const redisStore = require('koa-redis');

module.exports = (app) => {
    const router = new Router();

    router.use(session({
        key: 'koa:sess',
        store: redisStore({})
    }, app));

    router.post('/user/create', UserController.create);

    return router;
};