const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

const path = require('path');
module.exports = (webpackConfigEnv) => {
    const orgName = 'starwars';
    const projectName = 'api';
  const defaultConfig = singleSpaDefaults({
    orgName: "starwars",
    projectName: "api",
    webpackConfigEnv,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    externals: [/^rxjs\/?.*$/],
    entry: path.resolve(
      process.cwd(),
      `libs/${projectName}/src/${orgName}-${projectName}`
    ),
    devServer: {
      port: 9004,
      onListening: () => {},
    },
  });
};
