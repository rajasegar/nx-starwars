const { mergeWithRules } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");
const path = require('path');

module.exports = (webpackConfigEnv) => {
    const orgName = 'starwars';
    const projectName = 'styleguide';
  const defaultConfig = singleSpaDefaults({
    orgName: "starwars",
    projectName: "styleguide",
    webpackConfigEnv,
  });

  const config = mergeWithRules({
    module: {
      rules: {
        test: "match",
        use: "replace",
      },
    },
  })(defaultConfig, {
    // customize the webpack config here
    entry: path.resolve(
      process.cwd(),
      `libs/${projectName}/src/${orgName}-${projectName}`
    ),
    devServer: {
      port: 9005,
      onListening: () => {},
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            require.resolve("style-loader", {
              paths: [require.resolve("webpack-config-single-spa")],
            }),
            require.resolve("css-loader", {
              paths: [require.resolve("webpack-config-single-spa")],
            }),
            "postcss-loader",
          ],
        },
      ],
    },
  });

  return config;
};
