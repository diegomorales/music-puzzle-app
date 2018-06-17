const paths = require('./tasks/paths')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = () => {
  let isProd = process.env.NODE_ENV === 'production'

  let plugins = []

  if (isProd) {
    plugins.push(new UglifyJsPlugin({
      sourceMap: true
    }))
  }

  return {
    mode: process.env.NODE_ENV,
    watch: !isProd,
    devtool: isProd ? 'source-map' : 'eval-source-map',
    entry: {
      main: paths.devJs + 'main.js'
    },
    output: {
      publicPath: '/',
      filename: '[name].js',
      path: path.resolve(__dirname, paths.buildJs)
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js/,
          exclude: /node_modules/,
          loader: 'preprocess-loader',
          options: {
            'NODE_ENV': process.env.NODE_ENV
          }
        },
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['env']
              }
            }
          ]
        }
      ]
    },
    plugins: plugins
  }

}
