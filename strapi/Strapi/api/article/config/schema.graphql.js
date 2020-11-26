module.exports = {
  query: `
      articleCount(where: JSON): Int!
    `,
  resolver: {
    Query: {
      articleCount: {
        description: "Return the count of articles",
        resolverOf: "application::article.article.count",
        resolver: async (obj, options, ctx) => {
          return await strapi.api.article.services.article.count(
            options.where || {}
          );
        }
      }
    }
  }
};
