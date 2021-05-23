const path = require("path");
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;
const mode = argv.mode || "server";
const modeFlag = (mode == "production" ? true : false);
let envConfig = "";

if(argv.env=="server"){
        envConfig = require(`./config/webpack.server.js`)
}
else{
        envConfig = require(`./config/webpack.${mode}.js`)
}
const { merge } = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
//const DashboardPlugin = require("webpack-dashboard/plugin");
const { VueLoaderPlugin } = require('vue-loader');
const baseConfig = {
        mode,
        watch: !modeFlag,
        watchOptions: {
                ignored: /node_modules/,
                aggregateTimeout: 500,
                poll:100
        },
        output: {
                path: path.join(__dirname, "./dist/assets"),
                publicPath: "/",
                filename:"scripts/[name].bundle.js"
        },
        module: {
                rules: [{
                        test: /\.png$/,
                        use: [{
                                loader:"file-loader",
                                options:{
                                        esModule: false,
                                        name:modeFlag?"images/[name].[hash:5].[ext]":"images/[name].[ext]"
                                }
                        }]
                }, {
                        test: /\.vue$/,
                        use: ["vue-loader"]
                }, {
                        test: /\.js$/,
                        use: ["babel-loader"]
                }, {
                        test: /\.(css|less)$/,
                        use: [MiniCssExtractPlugin.loader,
                        { loader: "css-loader", options: { importLoaders: 1} },"less-loader"]
                }]
        },
        plugins: [
                //new DashboardPlugin(),
                new MiniCssExtractPlugin({
                        filename: "styles/[name].css",
                        chunkFilename: "styles/[name].css"
                }),
                new CleanWebpackPlugin({
                        cleanOnceBeforeBuildPatterns: [path.join(__dirname, "dist/web/**/*")],
                }),
                new VueLoaderPlugin()
        ],
        resolve: {
                alias: {
                        '@components': path.resolve("src/webapp/components")
                }
        }
};
module.exports = merge(baseConfig, envConfig)