const path = require('path')

module.exports = {
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }

    return config
  },
  // i18n: {
  //   locales: ['mn_MN', 'en-US'],
  //   defaultLocale: 'mn_MN',
  //   domains: [
  //     {
  //       domain: 'example.com',
  //       defaultLocale: 'mn_MN',
  //     },
  //     {
  //       domain: 'example.mn',
  //       defaultLocale: 'en-US',
  //     },
  //   ],
  // },

  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles/css')],
  },
}