const gulp = require('gulp')

// Tasks
const paths = require('./tasks/paths')
const startServer = require('./tasks/start-server')
const reload = require('./tasks/reload')
const cleanBuild = require('./tasks/clean-build')
const copyAssets = require('./tasks/copy-assets')
const copyPages = require('./tasks/copy-pages')
const lintScss = require('./tasks/lint-scss')
const lintJs = require('./tasks/lint-js')
const buildModernizr = require('./tasks/build-modernizr')
const buildScss = require('./tasks/build-scss')
const buildJs = require('./tasks/build-js')

// Set default environment
process.env.NODE_ENV = 'production'

const build = gulp.series(cleanBuild, gulp.parallel(
  copyAssets,
  copyPages,
  buildModernizr,
  buildScss,
  buildJs,
  lintScss,
  lintJs
))

const watch = gulp.series(build, () => {
  startServer()

  gulp.watch([paths.devJs + '**/*.js'], lintJs)
  gulp.watch([paths.devPages + '*.html'], gulp.series(copyPages, reload))
  gulp.watch([paths.devScss + '**/*.scss'], gulp.parallel(buildScss, lintScss))
  gulp.watch([paths.devAssets + '**/*.*'], gulp.series(copyAssets, reload))
})

gulp.task('default', gulp.series((done) => {
  // Set environment
  process.env.NODE_ENV = 'development'

  done()
}, watch))

gulp.task('build', build)
