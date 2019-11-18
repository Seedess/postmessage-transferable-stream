'use strict';

const path = require('path');
const css = require('./webpack.css')
const html = require('./webpack.html')

module.exports = {
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    
    entry: {
        main: path.resolve('./src/index.ts')
    },

    output: {
        filename: '[name].bundle.js',
        path: path.resolve('./public/dist')
    },

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  'style-loader',
                  // Translates CSS into CommonJS
                  'css-loader',
                  // Compiles Sass to CSS
                  'sass-loader',
                ],
            },
        ]
    },

    devServer: {
        contentBase: path.resolve('./public'),
        watchContentBase: true,
        compress: true,
        port: 9000,
        hot: true
    },

    plugins: [
        ...html.plugins,
        ...css.plugins
      ]
};
