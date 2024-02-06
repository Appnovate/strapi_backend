module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',

  'strapi::poweredBy',
  {
    name: 'strapi::cors',
    config: {
      origin: ['https://silly-nightingale.142-93-209-108.plesk.page'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      headers: '*',
      keepHeaderOnError: true,
    },
  },
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
