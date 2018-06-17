const gulp = require('gulp')
const paths = require('./paths')
const preprocess = require('gulp-preprocess')

module.exports = function copyPages () {
  return gulp.src(paths.devPages + '*.html')
    .pipe(preprocess({
      context: {
        NODE_ENV: process.env.NODE_ENV
      }
    }))
    .pipe(gulp.dest(paths.build))
}
