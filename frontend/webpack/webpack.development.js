/* eslint-disable no-undef */
const path = require("path");
const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const PATHS = {
  assets: "assets",
  src: path.resolve(__dirname, "../src"),
};

const filename = (extension) => {
  return `[name]${extension}`;
};

const plugins = [
  new webpack.SourceMapDevToolPlugin({ filename: "[file].map" }),
];

if (process.env.SERV) {
  plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = {
  devServer: {
    historyApiFallback: true,
    host: "localhost",
    hot: true,
    port: 8_281,
  },
  devtool: "eval-cheap-module-source-map",
  mode: "development",
  module: {
    rules: [
      {
        generator: { filename: `${PATHS.assets}/img/${filename("[ext]")}` },
        test: /\.(png|jpe?g|gif|svg)$/iu,
      },
      {
        test: /\.(s[ac]|c)ss$/iu,
        dependency: { not: ["url"] },
        exclude: /node_modules|antd\.css/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]--[hash:base64:5]",
              },
            },
          },
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              additionalData: '@import "variables"; @import "mixins";',
              sassOptions: {
                includePaths: [`${PATHS.src}/sass`],
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        include: /node_modules|antd\.css/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  output: {
    filename: filename(".js"),
    publicPath: process.env.SERV ? "/" : "",
  },
  plugins,
  target: "web",
};
