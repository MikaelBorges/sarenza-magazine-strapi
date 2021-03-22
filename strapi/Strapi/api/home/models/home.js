'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
    lifecycles: {
        async afterUpdate(response, params, data) {

            /* Init new column in all existing articles */
            // const articleList = await strapi.services.article.find();
            // articleList.forEach(article => strapi.services.article.update({ id: article.id }, { isHeadline: false }));

            /* Get existing headline and disabled it if necessary */
            const currentHeadline = await strapi.services.article.findOne({ isHeadline: true});
            if(currentHeadline && currentHeadline.id != data.ArticleUne) strapi.services.article.update({ id: currentHeadline.id }, { isHeadline: '' });
            /* Set new headline if necessary */
            if(!currentHeadline || currentHeadline.id != data.ArticleUne) strapi.services.article.update({ id: data.ArticleUne }, { isHeadline: 'true' });
        }   
    }    
};
