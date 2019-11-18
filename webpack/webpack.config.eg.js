'use strict';
const path = require('path');

const common = require('./webpack.config.common');
const css = require('./webpack.css')
const isProd = process.env.NODE_ENV === 'production'

console.log('[Webpack] Use example configuration\n');

module.exports = Object.assign({}, common, {

    mode: process.env.NODE_ENV || 'development',

    devtool: isProd ? '#source-map' : '#inline-source-map',

    entry: {
      PostMessageTransferableStream: path.resolve('./src/lib/PostMessageTransferableStream.ts'),
      example: path.resolve('./src/example/example.ts')
    },

    output: {
        filename: '[name].bundle.js',
        path: path.resolve('./public/dist')
    },

    module: {
      rules: isProd 
        ? common.module.rules.concat(css.module.rules)
        : common.module.rules
    }

});
