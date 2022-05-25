const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const PACKAGE = require('./package.json');

const mode = process.env.NODE_ENV || 'production';
const isNeedBundleAnalyzer = process.env.BUNDLE_ANALYZER;

module.exports = {
  mode,
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    alias: {
      '@src': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(woff|woff2|ttf|eot|png)$/,
        type: 'asset/resource',
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/assets',
          to: 'assets',
          filter: (srcPath) => {
            const extension = path.extname(srcPath);
            return !['.tsx', '.tmx', '.xcf'].includes(extension);
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index.html',
      favicon: './public/favicon.ico',
      title: PACKAGE.description,
      version: PACKAGE.version,
    }),
    ...(isNeedBundleAnalyzer ? [new BundleAnalyzerPlugin()] : []),
  ],
};
