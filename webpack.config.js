const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { SourceMapDevToolPlugin } = require("webpack");
const path = require("path");

console.log(path.join(__dirname, "public/index.html"));
module.exports = {
    mode: "development",
    stats: {
        children: true,
    },
    resolve: {
        extensions: [".js", ".vue", ".html"],
    },
    entry: {
        app: path.join(__dirname, "src/main.js"),
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: "vue-loader",
            },
            {
                test: /\.css$/,
                use: ["vue-style-loader", "css-loader", "postcss-loader"],
            },
            {
                test: /\.s[ac]ss$/,
                use: ["vue-style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true },
                    },
                ],
            },
            {
                test: /\.js$/,
                enforce: "pre",
                use: ["source-map-loader"],
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "public/index.html"), //템플릿 경로를 지정
        }),
        new SourceMapDevToolPlugin({
            filename: "[file].map",
        }),
    ],
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "dist"),
        publicPath: "/dist",
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 8080,
        open: true,
        historyApiFallback: true, //새로고침시 404에러 해결
    },
};
