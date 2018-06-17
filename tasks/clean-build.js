const paths = require('./paths');
const del = require('del');

module.exports = function cleanBuild () {
  return del(paths.build);
};
