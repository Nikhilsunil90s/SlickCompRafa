const path = require('path');
module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      dux: path.resolve(__dirname, 'src/dux'),
      api: path.resolve(__dirname, 'src/api'),
      components: path.resolve(__dirname, 'src/components'),
      assets: path.resolve(__dirname, 'src/assets'),
      config: path.resolve(__dirname, 'src/config'),
      context: path.resolve(__dirname, 'src/context'),
      helpers: path.resolve(__dirname, 'src/helpers'),
      layouts: path.resolve(__dirname, 'src/layouts'),
      reducers: path.resolve(__dirname, 'src/reducers'),
      routes: path.resolve(__dirname, 'src/routes'),
      data: path.resolve(__dirname, 'src/data'),
      hooks: path.resolve(__dirname, 'src/hooks')
    }
  };
  return config;
};
