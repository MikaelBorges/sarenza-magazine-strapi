"use strict";
const fetch = require("node-fetch");
const { Client } = require("pg");

/**
 *  article controller
 */

const source = "http://strapi.prd.sarenza.corp";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::article.article", () => {
  return {
    bootstrap,
  };
});

async function bootstrap() {
  await deleteTables();

  await fetchSourceToTarget({
    model: "rubrique",
    transformTo: (rubrique) => {
      return {
        ...rubrique,
        articles: undefined,
      };
    },
  });
  await fetchSourceToTarget({
    model: "menu",
    transformTo: (menu) => {
      return {
        ...menu,
        menu_item: undefined,
      };
    },
    doAfter: async (menu) => {
      for (const menu_item of menu.menu_items) {
        menu_item.publishedAt = new Date();
        await createOrUpdate("menu-item", menu_item.id, menu_item);
      }
    },
  });
  await fetchSourceToTarget({ model: "marquee" });
  await fetchSourceToTarget({ model: "gender" });
  await fetchSourceToTarget({ model: "footer" });
  await fetchSourceToTarget({ model: "display-component" });
  await fetchSourceToTarget({ model: "article" });

  return { ok: true };
}

async function deleteTables() {
  const client = new Client({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: Number(process.env.DATABASE_NAME),
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  });

  await client.connect();

  const tablesToDelete = [
    "components_block_text_block_texts",
    "components_footer_country_selectors",
    "components_input_buttons",
    "components_input_inputs_components",
    "components_input_inputs",
    "components_media_images",
    "components_media_videos_components",
    "components_media_videos",
    "components_mega_menu_links",
    "components_module_block_edito_longs",
    "components_module_block_edito_longs_components",
    "components_module_block_links",
    "components_module_block_links_components",
    "components_module_displays",
    "components_module_displays_components",
    "components_module_duo_image_texts",
    "components_module_duo_images",
    "components_module_duo_images_components",
    "components_module_duo_qrs",
    "components_module_duo_qrs_components",
    "components_module_duos",
    "components_module_duos_components",
    "components_module_footer_links",
    "components_module_helps",
    "components_module_helps_components",
    "components_module_histoires",
    "components_module_identity_cards",
    "components_module_identity_cards_components",
    "components_module_image_texts",
    "components_module_images_legends",
    "components_module_images_legends_components",
    "components_module_ligne_produits",
    "components_module_ligne_produits_components",
    "components_module_marquees",
    "components_module_newsletters",
    "components_module_newsletters_components",
    "components_module_paragraphes",
    "components_module_partner_icons",
    "components_module_partners",
    "components_module_partners_components",
    "components_module_product_cards",
    "components_module_product_looks",
    "components_module_product_looks_components",
    "components_module_produit_editos",
    "components_module_produit_editos_components",
    "components_module_questions_reponses",
    "components_module_reassurances",
    "components_module_reviews",
    "components_module_reviews_components",
    "components_module_slider_articles",
    "components_module_slider_articles_components",
    "components_module_trio_qrs",
    "components_module_trio_qrs_components",
    "components_module_various_texts",
    "components_module_vignettes",
    "components_navigation_back_to_tops",
    "components_social_media_instagrams",
    "components_social_media_social_media_items",
    "components_social_media_socialmedia_parents",
    "components_social_media_socialmedia_parents_components",

    "articles",
    "menu_items_menu_links",
    "menu_items_components",
    "menu_items",
    "menus",
    "rubriques",
    "marquees_components",
    "marquees",
    "footers_components",
    "footers",
    "genders",
    "home_components_components",
    "home_components",
    "homes",
  ];
  for (const tableToDelete of tablesToDelete) {
    await client.query(`DELETE FROM ${tableToDelete}`);
  }
  await client.end();
}

async function fetchSourceToTarget({ model, transformTo = (data) => data, doAfter = async (result) => result }) {
  try {
    const results = await fetch(source + "/" + model + "s").then((res) => res.json());
    for (const result of results) {
      const data = transformTo(result);
      data.publishedAt = new Date();
      await createOrUpdate(model, result.id, data);
      await doAfter(result);
    }
  } catch (err) {
    console.error(err);
  }
}

async function createOrUpdate(model, id, data) {
  const found = await strapi.entityService.findOne(`api::${model}.${model}`, id);
 // console.log("found", found);
  if (found === null) {
    try {
      await strapi.entityService.create(`api::${model}.${model}`, { data });
    } catch (err) {
      console.error(err);
    }
  } else {
    try {
      await strapi.entityService.update(`api::${model}.${model}`, id, { data });
    } catch (err) {
      console.error(err);
    }
  }
}
