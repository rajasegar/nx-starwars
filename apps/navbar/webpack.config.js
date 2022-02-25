const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");
const path = require('path');

module.exports = (webpackConfigEnv, argv) => {
    const orgName = 'starwars';
    const projectName = 'navbar';

  const defaultConfig = singleSpaDefaults({
    orgName: "starwars",
    projectName: "navbar",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    entry: path.resolve(
      process.cwd(),
      `apps/${projectName}/src/${orgName}-${projectName}`
    ),
    devServer: {
      port: 9001,
      onListening: () => {},
    },
  });
};
