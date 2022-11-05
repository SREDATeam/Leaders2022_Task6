/* eslint-disable indent */
/* eslint-disable no-undef */
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require("html-webpack-plugin");

const PATHS = {
  // eslint-disable-next-line unicorn/no-unused-properties
  assets: "assets",
  dist: path.resolve(__dirname, "../dist"),
  src: path.resolve(__dirname, "../src"),
  antd: path.resolve(__dirname, "../node_modules/antd"),
};

const plugins = [
  new HTMLWebpackPlugin({ template: `${PATHS.src}/index.html` }),
  new CleanWebpackPlugin(),
  // new CopyWebpackPlugin({
  //     patterns: [
  //         // { from: `${PATHS.assets}/img`, to: `${PATHS.assets}/img` },
  //         { from: `${PATHS.assets}/fonts`, to: `${PATHS.assets}/fonts` },
  //     ],
  // }),
];

module.exports = {
  context: PATHS.src,
  entry: {
    project: "./index.tsx",
  },
  module: {
    rules: [
      {
        exclude: /(node_modules|bower_components)/u,
        test: /\.([jt]sx?|mjsx)$/u,
        use: ["babel-loader"],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "all",
          enforce: true,
          name: "vendors",
          test: /node_modules/u,
        },
      },
    },
  },
  output: {
    path: PATHS.dist,
  },
  plugins,
  resolve: {
    alias: {
      components: `${PATHS.src}/components`,
      utils: `${PATHS.src}/utils`,
      antd: `${PATHS.antd}`,
    },
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
};
