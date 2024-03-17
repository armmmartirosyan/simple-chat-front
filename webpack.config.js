const HtmlWebpackPlugin = require("html-webpack-plugin");

const RULES = [
  {
    test: /\.(ts|tsx)$/,
    exclude: /node_modules/,
    use: "babel-loader",
  },
  {
    test: /\.(mp3|wav|webm|mp4)$/,
    use: ["file-loader"],
  },
  {
    test: /\.(sass|scss|css)$/i,
    use: ["style-loader", "css-loader", "sass-loader"],
  },
  {
    test: /\.(jpe?g|gif|png|svg)$/i,
    use: ["url-loader"],
  },
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
    extensions: [".tsx", ".ts", ".js", ".mp3", ".jpeg"],
  },
  devServer: {
    historyApiFallback: true,
    port: 3000,
    open: true,
    hot: true,
  },
};
