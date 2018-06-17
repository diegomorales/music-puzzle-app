const browser = require('browser-sync');

module.exports = function startServer () {
  browser.init({
    server: {
      baseDir: './build',
      port: 3000
    },
    open: false
  });
};
