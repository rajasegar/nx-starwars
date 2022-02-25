const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = (webpackConfigEnv, argv) => {
  const orgName = 'starwars';
  const projectName = 'root-config';
  webpackConfigEnv.isLocal = true;
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName,
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  const finalConfig = merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    entry: path.resolve(
      process.cwd(),
      `apps/${projectName}/src/${orgName}-${projectName}`
    ),
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

  // console.log(finalConfig);
  return finalConfig;
};
