const path = require("path");

module.exports = [
  {
    mode: "development",
    entry: "./src/main.ts",
    target: "electron-main",
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
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "main.bundle.js",
    },
    node: {
      __dirname: false,
    },
  },
];
