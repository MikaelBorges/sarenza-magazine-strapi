async function createOrUpdate(collection, where, data) {
  const uid = `api::${collection}.${collection}`;
  const results = await strapi.entityService.findMany(uid, {
    filters: where,
  });
  const found = results[0];

  data.publishedAt = new Date()
  
  if (found) {
    return await strapi.entityService.update(uid, found.id, { data });
  } else {
    return await strapi.entityService.create(uid, { data });
  }
}


module.exports = {
  createOrUpdate,
};
