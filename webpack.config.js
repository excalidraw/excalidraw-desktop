const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const commonConfiguration = {
  mode: "development",
  devtool: "sourcemap",
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: /src/,
        use: [{loader: "ts-loader"}],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
};

module.exports = [
  {
    ...commonConfiguration,
    target: "electron-main",
    entry: "./src/main.ts",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "main.js",
    },
    node: {
      __dirname: false,
    },
  },
  {
    ...commonConfiguration,
    target: "electron-renderer",
    entry: "./src/preload.ts",
    node: {__dirname: false, global: true},
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "preload.js",
    },
  },
  {
    ...commonConfiguration,
    target: "electron-renderer",
    entry: "./src/renderer.ts",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "renderer.js",
    },

    plugins: [
      new HtmlWebpackPlugin({
        filename: "pages/about.html",
        template: "./src/pages/about.html",
      }),
    ],
  },
];
