"use strict";

/**
 * footer router.
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::footer.footer", {
  only: ["find", "findOne"],
  config: {
    find: {
      auth: false,
    },
    findOne: {
      auth: false,
    },
  },
});
