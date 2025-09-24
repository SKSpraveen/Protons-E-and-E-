const webpack = require("webpack");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        stream: require.resolve("stream-browserify"),
        vm: require.resolve("vm-browserify"),
        process: require.resolve("process"), // 👈 just the package
      };

      webpackConfig.plugins = (webpackConfig.plugins || []).concat([
        new webpack.ProvidePlugin({
          process: "process", // 👈 just the package
          Buffer: ["buffer", "Buffer"],
        }),
      ]);

      return webpackConfig;
    },
  },
};
