import type { Core } from "@strapi/strapi";

const PUBLIC_FIND = [
  "api::global.global",
  "api::home.home",
  "api::about-page.about-page",
  "api::diagnostic-page.diagnostic-page",
  "api::blog-page.blog-page",
  "api::videos-page.videos-page",
  "api::contact-page.contact-page",
  "api::podcast.podcast",
  "api::category.category",
  "api::article.article",
  "api::video.video",
  "api::testimonial.testimonial",
  "api::faq-item.faq-item",
  "api::diagnostic-audio.diagnostic-audio",
  "api::diagnostic-result.diagnostic-result",
  "api::legal-page.legal-page",
];

const WITH_FIND_ONE = new Set([
  "api::category.category",
  "api::article.article",
  "api::video.video",
  "api::testimonial.testimonial",
  "api::faq-item.faq-item",
  "api::diagnostic-audio.diagnostic-audio",
  "api::diagnostic-result.diagnostic-result",
  "api::legal-page.legal-page",
]);

async function grantPublicRead(strapi: Core.Strapi) {
  const role = await strapi.db.query("plugin::users-permissions.role").findOne({ where: { type: "public" } });
  if (!role) return;

  for (const uid of PUBLIC_FIND) {
    const actions = WITH_FIND_ONE.has(uid) ? ["find", "findOne"] : ["find"];
    for (const action of actions) {
      const actionId = `${uid}.${action}`;
      const existing = await strapi.db.query("plugin::users-permissions.permission").findOne({
        where: { action: actionId, role: role.id },
      });
      if (!existing) {
        await strapi.db.query("plugin::users-permissions.permission").create({
          data: { action: actionId, role: role.id },
        });
      }
    }
  }
}

export default {
  register() {},
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await grantPublicRead(strapi);
  },
};
