const gulp = require('gulp');
const paths = require('./paths');
const eslint = require('gulp-eslint');

module.exports = function lintJs () {
  return gulp.src([
    paths.devJs + '**/*.js'
  ])
    .pipe(eslint())
    .pipe(eslint.format());
}
