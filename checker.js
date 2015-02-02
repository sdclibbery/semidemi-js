var http = require('http');
var fs = require('fs');

eval(fs.readFileSync('./src/parser.js', 'utf8'));
eval(fs.readFileSync('./src/matcher.js', 'utf8'));
eval(fs.readFileSync('./src/scorer.js', 'utf8'));
eval(fs.readFileSync('./src/bestmatch.js', 'utf8'));

console.log("SemiDemi Checker");

function downloadFile (options, succ, err) {
  http.get(options).on('response', function (response) {
    var body = '';
    response.on('data', function (chunk) {
      body += chunk;
    });
    response.on('end', function () {
      succ(body);
    });
  }).on('error', function(e) {
    err(e.message);
  });;
}


var matchers = SemiDemi.parse(fs.readFileSync('./tvs.demi', 'utf8'));
var normaliseDemiValue = function (v) {
  return v.toLowerCase().replace(/[^a-z0-9]/g, "_");
}

function semidemi (ua) {
  var result = SemiDemi.bestMatch(matchers, ua);
  if (!result) { return; }
  return result[0].brand+"-"+result[0].model;
}

function parseDemi (response) {
  var brandMatch = response.match(/<dt>brand<\/dt>\s*<dd><span class=\"string\">([^<]+)<\/span><\/dd>/);
  var modelMatch = response.match(/<dt>model<\/dt>\s*<dd><span class=\"string\">([^<]+)<\/span><\/dd>/);
  if (!brandMatch || !modelMatch) {
    return;
  }
  return normaliseDemiValue(brandMatch[1]) + "-" + normaliseDemiValue(modelMatch[1]);
}

function demi (ua, succ, err) {
  var options = {
    host: 'www.test.bbc.co.uk',
    path: '/frameworks/test/demi/php',
    headers: {'user-agent': ua}
  };
  downloadFile(options, function (data) {
    succ(parseDemi(data.toString()));
  }, err);
}

function testUA (ua, idx, done) {
  demi(ua, function (demi) {
    if (semidemi(ua) === demi) {
      process.stdout.write(".");
    } else {
      process.stdout.write("x");
      console.log("\n"+idx+": FAILED: " + ua + "\nSemiDemi:  " + semidemi(ua) + "\nDemi    : " + demi);
    }
    done();
  }, function (err) {
    process.stdout.write("e");
    console.log("\n"+idx+": ERROR: " + ua + "\nDemi error: " + err);
    done();
  });
}

function runTests (uas) {
  var start = process.argv[2] || 0;
  var end = process.argv[3] || lines.length;
  var lines = uas.split(/[\r\n]+/);
  console.log("Num UAs: " + lines.length);
  var i = 0;
  var doNextTest = function () {
    var next = function () {
      i++;
      if (i < lines.length) {
        doNextTest();
      } else {
        console.log("Finished");
      }
    };
    if (i >= start && i <= end) {
      testUA(lines[i], i, next);
    } else {
      next();
    }
  };
  doNextTest();
}


runTests(fs.readFileSync('testdata/checker_uas.txt', 'utf8'));
