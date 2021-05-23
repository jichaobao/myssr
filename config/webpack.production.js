const path = require("path");
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const CopyPlugin = require("copy-webpack-plugin");
var minify = require('html-minifier').minify;
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const os = require("os");
//const Terser = require("terser-webpack-plugin");
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
module.exports = {
        output: {
                filename: 'scripts/[name].[contenthash].js'
        },
        optimization: {
                minimizer: [
                        '...', //默认值，如果没有的话需要用Terser压缩js
                        new CssMinimizerPlugin(),
                        // new UglifyJsPlugin({
                        //         //parallel: true,
                        //         parallel:os.cpus().length
                        // }),
                        //new Terser()
                        
                ],
        },
        plugins: [
                new WebpackBuildNotifierPlugin({
                        title: "项目名称",
                        suppressSuccess: true, // don't spam success notifications
                }),
                new CopyPlugin({
                        patterns: [
                                {
                                        from: path.join(__dirname, "../src/web/views/layouts"),
                                        to: "../views/layouts",
                                        transform(content) {
                                                return minify(content.toString(), {
                                                        collapseWhitespace: true
                                                });
                                        }
                                },
                                {
                                        from: path.join(__dirname, "../src/web/components"),
                                        to: "../components",
                                        globOptions: {
                                                ignore: ["**/*.js", "**/*.css"],
                                        },
                                        transform(content) {
                                                return minify(content.toString(), {
                                                        collapseWhitespace: true
                                                });
                                        }
                                },
                        ],
                }),
                new WebpackManifestPlugin(),
        ]
}