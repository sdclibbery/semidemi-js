var http = require("http");
var url = require("url");
var path = require("path");
var fs = require("fs");
var port = 9990;

eval(fs.readFileSync('./src/parser.js', 'utf8'));
eval(fs.readFileSync('./src/matcher.js', 'utf8'));
eval(fs.readFileSync('./src/scorer.js', 'utf8'));
eval(fs.readFileSync('./src/bestmatch.js', 'utf8'));

var matchers = SemiDemi.parse(fs.readFileSync('./tvs.demi', 'utf8'));
var normaliseDemiValue = function (v) {
  return v.toLowerCase().replace(/[^a-z0-9]/g, "_");
}

var server = http.createServer(function(req, res) {
  var uagent = req.headers['user-agent'];
  var result = SemiDemi.bestMatch(matchers, uagent);
  if (!result) { result = [{ brand:"generic", model:"smarttv" }] }
  var id = result[0].brand+"-"+result[0].model;
  res.writeHead(200, {"Content-Type": "text/html"});
  res.write(id);
  res.end();
});
server.listen(port);

