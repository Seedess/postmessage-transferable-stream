'use strict';

const common = require('./webpack.config.common');
const path = require('path');
const css = require('./webpack.css')

console.log('[Webpack] Use prod configuration\n');

module.exports = Object.assign({}, common, {

    mode: 'production',
    devtool: '#source-map',
    entry: {
        prod: path.resolve('./src/index.ts')
    },
    module: {
        rules: [
            ...common.module.rules,
            ...css.module.rules
        ]
    }

});
