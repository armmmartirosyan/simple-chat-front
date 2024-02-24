const HtmlWebpackPlugin = require('html-webpack-plugin')

const RULES = [
    {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: "babel-loader"
    },
    {
        test: /\.(sass|scss|css)$/i,
        use: [
            "style-loader",
            "css-loader",
            "sass-loader",
        ],
    }
];

const PLUGINS = [
    new HtmlWebpackPlugin({
        template: "./src/index.html",
    }),
];

module.exports = {
    entry: "./src/index.tsx",
    module: {
        rules: RULES,
    },
    plugins: PLUGINS,
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    devServer: {
        historyApiFallback: true,
        port: 3000,
        open: true,
        hot: true,
    }
}
