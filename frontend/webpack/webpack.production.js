/* eslint-disable no-undef */
const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const PATHS = {
  assets: "assets",
  src: path.resolve(__dirname, "../src"),
};
const filename = (extension) => {
  return `[name].[fullhash]${extension}`;
};

const plugins = [
  new webpack.SourceMapDevToolPlugin({ filename: "[file].map" }),
  new MiniCssExtractPlugin({ filename: filename(".css") }),
];

module.exports = {
  devtool: "source-map",
  mode: "production",
  module: {
    rules: [
      {
        generator: { filename: `${PATHS.assets}/img/${filename("[ext]")}` },
        test: /\.(png|jpe?g|gif|svg)$/iu,
      },
      {
        test: /\.css$/,
        include: /node_modules|antd\.css/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: "" },
          },
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.(s[ac]|c)ss$/iu,
        dependency: { not: ["url"] },
        exclude: /node_modules|antd\.css/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: "" },
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
    ],
  },
  output: {
    filename: filename(".js"),
  },
  plugins,
  target: "browserslist",
};
