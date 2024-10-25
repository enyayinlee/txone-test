const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/output',
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },

  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.scss?$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', {
          loader: 'sass-loader',
          options: {
            sassOptions: {
              outputStyle: 'compressed',
            },
          },
        },],
      },
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-react', { runtime: 'automatic' }],
              '@babel/preset-env',
              '@babel/preset-typescript',
            ],
          },
        },
      },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
    ],
  },
};
