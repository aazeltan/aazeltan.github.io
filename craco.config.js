
module.exports = {
    style: {
      postcss: {
        // receive CRA’s default plugin list
        plugins: (defaultPlugins) => {
          // remove any plugin named 'postcss-inline-svg'
          return defaultPlugins.filter(
            (pl) => pl.postcssPlugin !== 'postcss-inline-svg'
          );
        },
      },
    },
  };