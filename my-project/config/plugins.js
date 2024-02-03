// module.exports = () => ({});
module.exports = {
    'qrcode-generator': {
      enabled: true,
      config: {
        contentTypes: [
          {
            uid: 'api::event-user.event-user',
            targetField: 'slug',
            frontend: {
              basePath: '/event-users',
            },
          },
        ],
      },
    },
  };