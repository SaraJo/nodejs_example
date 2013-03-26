// Imports
var http = require('http');
var url = require('url');
var fs = require('fs')

// Constants
var CONTENT_TYPE_JSON = {'Content-Type': 'application/json'};
var CONTENT_TYPE_JAVASCRIPT = {'Content-Type': 'text/javascript'};
var SCRIPT = load_file('assets/script.js','utf8')

// Router handles all requests and routes based on request path
var router = function(req, res) {
  var reqUrl = url.parse(req.url, true);
  switch(reqUrl.pathname) {
    case '/get-asset':
      res.writeHead(200, CONTENT_TYPE_JAVASCRIPT);
      res.end(SCRIPT);
      break;
    default:
      // Send 404
      res.writeHead(404, CONTENT_TYPE_JSON);
      var output = { result: '404' };
      res.end(JSON.stringify(output));
      break;
  }
};

// Load file based on path and encode
function load_file(file_path, encode){
  var content = fs.readFileSync(file_path, encode);
  return content;
}

// Create the server using our router and export the server
var server = http.createServer(router);
module.exports = server;