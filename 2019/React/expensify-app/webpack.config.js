const path = require('path');

module.exports = {
  entry: "./src/playground/redux-expensify.js",
  output: {
    path: path.join(__dirname, 'public'),
    filename: "bundle.js",
  },
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.jsx?$/,
      exclude: /node_modules/,
    }, {
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ],
      test: /\.s?css$/,
    }],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
  },
  mode: "development",
};
