/* eslint-disable no-undef */
const { merge } = require('webpack-merge');

const commonConfig = require('./webpack.common');

const variableConfic = process.env.NODE_ENV === 'dev'
  ? require('./webpack.development')
  : require('./webpack.production');

module.exports = merge(commonConfig, variableConfic);
