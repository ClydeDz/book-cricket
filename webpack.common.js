const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var webpack = require("webpack");

module.exports = {
    entry: ['./src/javascript/index.ts', './src/sass/styles.scss'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: "/dist/"
    },

    devServer: {
        compress: true,
        port: 9000
    },
    
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules|test/
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: process.env.NODE_ENV.trim() == "development" ? "style-loader" : MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "postcss-loader"
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass")
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: 'images/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|ttf|otf|eot)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: 'fonts'
                        }
                    }
                ]
            }
        ]
    },

    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: "bundle.css"
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]    
}; 