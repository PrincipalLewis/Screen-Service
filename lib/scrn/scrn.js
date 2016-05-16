

/**
 * @namespace
 */
var scrn = {};


/**
 * @type {string}
 */
scrn.__PHANTOM_SCRIPT = 'script.js';


/**
 * @type {string}
 */
scrn.__PHANTOM_DAEMON = 'node_modules/.bin/phantomjs';


/**
 * Точка входа.
 */
scrn.init = function() {
  console.info('Screen service started.');
  scrn.startServer();
};


/**
 * @param {Object} trueUrl
 * @param {function(string)} callback
 */
scrn.phantom = function(trueUrl, callback) {
  cp.spawn(scrn.__PHANTOM_DAEMON, [scrn.__PHANTOM_SCRIPT,
    trueUrl]).stdout.on('data', function(data) {
    callback(data);
  });
};


/**
 * Server
 */
scrn.startServer = function() {
  var server = new http.Server();
  server.addListener('request', function(req, res) {
    var urlParsed = url.parse(req.url);
    var trueUrl = urlParsed.query;
    if (trueUrl) {
      scrn.phantom(trueUrl, function(data) {
        if (data == 0) {
          res.statusCode = 404;
          res.end('page not found');
        } else {
          res.writeHead(200, {
            'Content-Type': 'text/html' });
          res.end('<img src="data:image/jpeg;base64,' + data + '">');
        }
      });
    } else {
      res.end('enter a valid URL');
    }
  });
  server.listen(1337, '127.0.0.1');
};

