"use strict";

/**
 * rubrique router.
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::rubrique.rubrique", {
  only: ["find"],
  config: {
    find: {
      auth: false,
    },
  },
});
