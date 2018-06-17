const gulp = require('gulp');
const paths = require('./paths');

module.exports = function copyAssets () {
  return gulp.src(paths.devAssets + '**/*.*')
    .pipe(gulp.dest(paths.buildAssets));
};
