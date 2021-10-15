const { LoaderOptionsPlugin } = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
    mode: 'development',
    entry: './arnonspokedex/index.js',
    output: {
      filename: 'main.[contentHash].js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './Arnonspokedex/index.html'
    })]
}