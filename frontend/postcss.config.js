/* eslint-disable indent */
/* eslint-disable no-undef */
const isProduction = process.env.NODE_ENV === 'production';
const plugins = [require('postcss-preset-env'), require('postcss-sort-media-queries')];

if (isProduction) {
    plugins.push(
        require('cssnano')({
            preset: 'default',
        }),
    );
}

module.exports = {
    plugins,
};
