'use strict';

/**
 * marquee service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::marquee.marquee');
