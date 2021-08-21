const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const isDev = process.env.NODE_ENV !== "production";

const outputPath = path.resolve(__dirname, "dist");

var main = {
  mode: isDev ? "development" : "production",
  target: "electron-main",
  devtool: isDev ? "source-map" : false,
  entry: path.resolve(__dirname, "src", "main", "index"),
  output: {
    filename: "index.js",
    path: outputPath,
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [path.resolve(__dirname, "src")],
        exclude: [path.resolve(__dirname, "node_modules")],
        loader: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "renderer", "index.html"),
        },
      ],
    }),
  ],
};

var renderer = {
  mode: isDev ? "development" : "production",
  target: "electron-renderer",
  entry: path.resolve(__dirname, "src", "renderer", "index"),
  devtool: isDev ? "inline-source-map" : false,
  output: {
    filename: "index.js",
    path: path.resolve(outputPath, "scripts"),
  },
  resolve: {
    extensions: [".json", ".js", ".jsx", ".css", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["ts-loader"],
        include: [
          path.resolve(__dirname, "src", "renderer"),
          path.resolve(__dirname, "node_modules"),
        ],
      },
    ],
  },
  plugins: [
    // Module not found: Error: Can't resolve './lib-cov/fluent-ffmpeg' が出るのを防ぐ
    new webpack.DefinePlugin({
      "process.env.FLUENTFFMPEG_COV": false,
    }),
  ],
};

module.exports = [main, renderer];
