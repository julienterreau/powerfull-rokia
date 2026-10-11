export default {
  async afterCreate(event: { result: { subject?: string; name?: string; email?: string; message?: string } }) {
    const { result } = event;
    const to = process.env.CONTACT_NOTIFY_EMAIL;
    if (!to) return;
    try {
      await strapi.plugin("email").service("email").send({
        to,
        subject: `Powerfull Rokia — ${result.subject}`,
        text: `${result.name} <${result.email}>\n\n${result.message}`,
      });
    } catch (error) {
      strapi.log.warn("Notification e-mail non envoyée. Configurez le plugin email de Strapi.");
    }
  },
};
