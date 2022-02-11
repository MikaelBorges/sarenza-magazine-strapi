"use strict";

/**
 * home router.
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::home.home", {
  only: ["find"],
  config: {
    find: {
      auth: false,
    },
  },
});
