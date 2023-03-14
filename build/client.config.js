const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const clientPort = process.env.PORT || 8080;
const clientHost = process.env.HOST || 'localhost';
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    mode: 'production',
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
        'client-main': './src/client/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Webpack Output",
        }),
    ],
    devServer: {
        
        // Enable compression
        compress: false,

        //
        host: clientHost,
        port: clientPort

    }
};


