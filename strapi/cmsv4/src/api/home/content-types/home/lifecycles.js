module.exports = {
  async afterUpdate(event) {
    const { data: home } = event.params;
    const newArticleUneId = home.ArticleUne;

    const oldArticlesUne = await strapi.entityService.findMany(`api::article.article`, {
      filters: { isHeadline: true },
    });

    for (const oldArticleUne of oldArticlesUne) {
      await strapi.entityService.update(`api::article.article`, oldArticleUne.id, {
        data: {
          isHeadline: false,
        },
      });
    }

    await strapi.entityService.update(`api::article.article`, newArticleUneId, {
      data: {
        isHeadline: true,
      },
    });
  },
};
