"use strict";
const { home } = require("../data.js");
const { createOrUpdate } = require("../../../utils");
/**
 *  home controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::home.home", () => ({
  async bootstrap(ctx) {
    ctx.body = await createOrUpdate("home", { id: 1 }, home);
  },
}));
