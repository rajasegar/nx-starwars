const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (webpackConfigEnv, argv) => {
  const orgName = 'starwars';
  webpackConfigEnv.isLocal = true;
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: 'root-config',
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  const finalConfig = merge(defaultConfig, {
    // const finalConfig = merge(nxconfig, {
    // modify the webpack config however you'd like to by adding to this object
    devServer: {
      port: 9000,
      onListening: () => {},
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: 'apps/root-config/src/index.ejs',
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          orgName,
        },
      }),
    ],
  });

  console.log(finalConfig);
  return finalConfig;
};
