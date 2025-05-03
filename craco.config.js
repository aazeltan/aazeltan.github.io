// craco.config.js
module.exports = {
    style: {
      postcss: {
        plugins: [
          require('cssnano')({
            preset: ['default', {
              // disable SVGO
              svgo: false,
            }],
          }),
        ],
      },
    },
  }
  