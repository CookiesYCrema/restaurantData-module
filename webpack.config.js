const path = require("path");
module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, "./Client/src/"),
  output: {
    path: path.resolve(__dirname, "./Client/dist"),
    filename: "bundle.js"
  },
  
  module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.js[x]?/,
        exclude: /node_modules/,
        options: {
          presets: ["react", "env"]
        }
      }
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"]
  }
};
