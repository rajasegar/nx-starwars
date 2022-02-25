const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react');

const path = require('path');
module.exports = (webpackConfigEnv = {}) => {
  const orgName = 'starwars';
  const projectName = 'people';
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName,
    webpackConfigEnv,
  });

  const config = merge(defaultConfig, {
    // customizations go here
    entry: path.resolve(
      process.cwd(),
      `apps/${projectName}/src/${orgName}-${projectName}`
    ),
    devServer: {
      port: 9002,
      onListening: () => {},
    },
  });

  return config;
};
