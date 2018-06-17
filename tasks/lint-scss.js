const gulp = require('gulp');
const paths = require('./paths');
const stylelint = require('gulp-stylelint');

module.exports = function lintScss () {
  return gulp.src([
    paths.devScss + '**/*.scss'
  ])
    .pipe(stylelint({
      failAfterError: false,
      reporters: [
        {
          formatter: 'string',
          console: true
        }
      ]
    }));
}
