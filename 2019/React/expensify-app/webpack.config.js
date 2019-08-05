const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
  const isProduction = env === 'production';
  const CSSExtract = new MiniCssExtractPlugin({
    filename: 'styles.css',
    chunkFilename: 'chunk.css',
    ignoreOrder: false,
  });
  return {
    entry: "./src/app.jsx",
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: "bundle.js",
    },
    plugins: [
      CSSExtract,
    ],
    module: {
      rules: [
        {
          loader: 'babel-loader',
          test: /\.jsx?$/,
          exclude: /node_modules/,
        }, {
          test: /\.s?css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: { publicPath: '../public/', },
            },
            {
              loader: 'css-loader',
              options: { sourceMap: true, },
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: true, },
            },
          ],
        }, 
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      publicPath: '/dist/',
      historyApiFallback: true,
    },
    mode: "development",
  };  
}
