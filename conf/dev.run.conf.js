var HtmlWebPackPlugin = require("html-webpack-plugin");
var helpers = require("./helpers.js");
var resolve = require("path").resolve;

module.exports = {
  devtool: "inline-source-map",
  devServer: {
    port: 6969,
    contentBase: helpers.root(".", "/src/front"),
    index: "dev-bundle.html",
    https: true,
    watchContentBase: true,
    historyApiFallback: true,
    publicPath: "/",
    proxy: {
      "/dishes": "http://localhost:1234",
      "/drinks": "http://localhost:1234",
      "/sweets": "http://localhost:1234"
    }
  },
  entry: helpers.root(".", "/src/front/app.tsx"),
  output: {
    filename: "dev-bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: resolve("node_modules"),
        loaders: [
          {
            loader: "ts-loader",
            options: { configFile: helpers.root(".", "tsconfig.json") }
          }
        ]
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"]
      },
      {
        test: /\.(svg|png|jpg|ttf|otf|eot|woff)/,
        loader: "file-loader"
      }
    ]
  },
  resolve: {
    extensions: [
      ".ts",
      ".tsx",
      ".css",
      ".js",
      ".svg",
      ".jpg",
      ".png",
      ".ttf",
      ".otf",
      ".eot",
      ".woff"
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      filename: "dev-bundle.html",
      template: helpers.root(".", "src/front/index.html")
    })
  ],
  node: {
      'fs': 'empty'
  }
};
