const merge = require("webpack-merge");
const path = require("path");
const webpackConfigBase = require("./webpack.config.base");

const devConfig = {
  mode: "development",
  devtool: "source-map",
  devServer: {
    port: 3002,
    hot: true,
    static: {
      directory: path.join(__dirname, "dist"),
    },
    open: true,
    proxy: {
      // 代理
      "/": {
        target: "http://localhost:3000",
        changeOrigin: true,
        pathRewrite: {
          "^/": "",
        },
      },
    },
  },
};

module.exports = merge(webpackConfigBase, devConfig);
