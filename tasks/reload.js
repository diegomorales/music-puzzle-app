const browser = require('browser-sync');

module.exports = function reload (done) {
  browser.reload();
  done();
};
