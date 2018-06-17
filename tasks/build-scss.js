const gulp = require('gulp');
const paths = require('./paths');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const browser = require('browser-sync');

module.exports = function buildScss () {
  let isProd = process.env.NODE_ENV === 'production';

  let postCssTasks = [
    autoprefixer({browsers: ['last 2 versions']})
  ];

  if (isProd) {
    postCssTasks.push(cssnano({
      discardComments: {
        removeAll: true
      }
    }));
  }

  return gulp.src(paths.devScss + '*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass()
      .on('error', sass.logError))
    .pipe(postcss(postCssTasks))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.buildCss))

    // reload browser
    .pipe(browser.stream({match: '**/*.css'}));
};
