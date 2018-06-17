const browser = require('browser-sync')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpackConfig = require('../webpack.config')

console.log(webpackConfig)

module.exports = function buildJs (done) {
  let isProd = process.env.NODE_ENV === 'production'

  let plugins = []

  if (isProd) {
    plugins.push(new UglifyJsPlugin({
      sourceMap: true
    }))
  }

  webpack(webpackConfig(), (err, stats) => {
    if (err) {
      console.error(err.stack || err)
      if (err.details) {
        console.error(err.details)
      }
      return
    }

    const info = stats.toJson()

    if (stats.hasErrors()) {
      console.error(info.errors)
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings)
    }

    // Log result...
    console.log(stats.toString({
      chunks: false, // Makes the build much quieter
      modules: false,
      colors: true, // Shows colors in the console
      moduleTrace: false
    }))

    browser.reload()

    done()
  })
}
