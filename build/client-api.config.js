const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv')
const HtmlWebpackPlugin = require("html-webpack-plugin");

const devMode = process.env.NODE_ENV !== 'production';


module.exports = {
    mode: !devMode ? 'production' : 'development',
    performance: {
        hints: !devMode ? "warning" : false
    },
    resolve: {
        fallback: {
            "fs": false
        },
        extensions: ['.js']
    },
    entry: {
        'api-main': './src/client-api/index.js'
    },
    output: {
        globalObject: 'this',
        library: "API",
        libraryTarget: "umd",
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist-api')
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/tmpl-api/index.html',
            title: "Test API",
            scriptLoading: 'blocking',
            minify: false
        }),
        // fix "process is not defined" error:
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env)
         })
    ]
};


