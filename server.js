var express = require('express');
var fs = require("fs");

var app = express();

var port = 7591;

eval(fs.readFileSync('./src/parser.js', 'utf8'));
eval(fs.readFileSync('./src/matcher.js', 'utf8'));
eval(fs.readFileSync('./src/scorer.js', 'utf8'));
eval(fs.readFileSync('./src/bestmatch.js', 'utf8'));

var matchers = SemiDemi.parse(fs.readFileSync('./tvs.demi', 'utf8'));
var normaliseDemiValue = function (v) {
  return v.toLowerCase().replace(/[^a-z0-9]/g, "_");
}

app.get('/', function (req, res) {
  var uagent = req.query.ua || req.headers['user-agent'] || '';
  var result = SemiDemi.bestMatch(matchers, uagent);
  if (!result) { result = [{ brand:"generic", model:"smarttv" }] }
  res.send(JSON.stringify(result[0]));
});

app.listen(port, function() {
  console.log('running on port: ' +port);
});
