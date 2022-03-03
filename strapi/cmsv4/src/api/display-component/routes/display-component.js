"use strict";

/**
 * display-component router.
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::display-component.display-component", {
  only: ["find"],
  config: {
    find: {
      auth: false,
    },
  },
});
