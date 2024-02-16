module.exports = [
    "strapi::errors",
    "strapi::security",
     {
      name: 'strapi::cors',
      config: {
        origin: ['https://silly-nightingale.142-93-209-108.plesk.page','https://exciting-blackburn.142-93-209-108.plesk.page'],
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
        headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
        keepHeaderOnError: true,
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