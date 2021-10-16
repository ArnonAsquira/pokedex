const { LoaderOptionsPlugin } = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    mode: 'development',
    entry: './arnonspokedex/index.js',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader,"css-loader"],
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './Arnonspokedex/index.html'
    }), new MiniCssExtractPlugin()]
}