module.exports = [
    "strapi::errors",
    "strapi::security",
     {
        name: 'strapi::cors',
        config: {
          enabled: true,
          headers: '*',
          origin: ['https://silly-nightingale.142-93-209-108.plesk.page','https://exciting-blackburn.142-93-209-108.plesk.page'],

        }
      },
    "strapi::poweredBy",
    "strapi::logger",
    "strapi::query",
    "strapi::body",
    'strapi::session',
    "strapi::favicon",
    "strapi::public",
  ];