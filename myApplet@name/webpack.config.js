/* eslint-disable */
'use strict';
const path = require('path');
const UUID = "myApplet@name"

module.exports = {
  mode: "production",
  entry: {
    index: "./src/applet.ts",
  },
  output: {
    // TODO: adjust name
    filename: "my-applet.js",
    path: path.resolve(__dirname, `files/${UUID}/`),
    // TODO: adjust name
    library: "myApplet",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: "ts-loader",
          options: {
            configFile: "src/tsconfig.json",
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    modules: [
      // allow import modules using absolute paths
      path.join(__dirname, "src"),
      "node_modules",
    ],
  },
  // without webpack renames 'global'
  target: "node",
  optimization: {
    minimize: false,
    usedExports: true,
  },
  plugins: [],
};
