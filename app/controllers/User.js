'use strict';

const pkginfo = require('../../package.json');
const spec = require('../spec');
const User = require('../models/User');

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - Public
 *     summary: Show API information.
 *     operationId: showApiInfo
 *     responses:
 *       200:
 *         description: Describe general API information
 */
exports.create = (ctx) => {
  let user = new User();

  user.create(ctx.request.body).then((response) => {
    ctx.res.ok(response, "Successfully created user");
  }).catch((error) => {
    ctx.res.badRequest(400, "error", error);
  });
};