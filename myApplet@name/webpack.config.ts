import path from "path"
import webpack from "webpack"

// TODO: set correct UUID: <applet-name>@<github-username>
const UUID = "myApplet@name"

const config: webpack.Configuration = {
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
        test: /\.ts?$/,
        use: "ts-loader",
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
}

export default config
