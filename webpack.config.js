// webpack.config.js
import path from 'path';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

export default function(env, argv) {
  const PRODUCTION = argv.mode && argv.mode === 'production';

  let config = {
    entry: ['react-hot-loader/patch', './src/index.js'],
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: PRODUCTION ? '[name].[hash].js' : '[name].js'
    },
    mode: PRODUCTION ? 'production' : 'development',
    resolve: {
      alias: {
        'react-dom': '@hot-loader/react-dom'
      }
    },
    devtool: PRODUCTION ? 'source-map' : 'cheap-module-eval-source-map',
    module: {
      rules: [
        {
          test: /\.(m?js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: ['react-hot-loader/babel']
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: { hmr: !PRODUCTION }
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        inject: true,
        hash: false,
        template: 'src/index.html',
        filename: 'index.html'
      }),
      new MiniCssExtractPlugin({
        filename: PRODUCTION ? 'main.[contenthash].css' : 'main.css'
      })
    ]
  };

  if (PRODUCTION) {
    config.plugins.push(new CleanWebpackPlugin());
  } else {
    config.devServer = {
      contentBase: path.join(__dirname, 'build'),
      hot: true
    };
  }

  return config;
}
