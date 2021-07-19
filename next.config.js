const path = require('path')

module.exports = {
  i18n: {
    locales: ['mn_MN', 'en-US'],
    defaultLocale: 'mn_MN',
    domains: [
      {
        domain: 'example.com',
        defaultLocale: 'mn_MN',
      },
      {
        domain: 'example.mn',
        defaultLocale: 'en-US',
      },
    ],
  },

  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles/css')],
  },
}