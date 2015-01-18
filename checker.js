var http = require('http');
var fs = require('fs');

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

function semidemi (ua) {
/*
  var result = SemiDemi.bestMatch(matchers, tests[i].uagent);
  if (!result) { return; }
  return result[0].brand+"_"+result[0].model;
*/
}

function parseDemi (response) {
  var brand = response.match(/<dt>brand<\/dt>\s*<dd><span class=\"string\">([^<]+)<\/span><\/dd>/)[1];
  var model = response.match(/<dt>model<\/dt>\s*<dd><span class=\"string\">([^<]+)<\/span><\/dd>/)[1];
  return brand.toLowerCase()+"_"+model.toLowerCase();
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

function testUA (ua, done) {
  demi(ua, function (demi) {
process.stdout.write(demi);
    // Need to parse the demi response HTML to find brand and model
    // Need to make semidemi() work
    if (semidemi(ua) === demi) {
      process.stdout.write(".");
    } else {
      process.stdout.write("x");
      console.log("FAILED: " + ua + "\nSemiDemi:  " + semidemi(ua) + "\nDemi: " + demi);
    }
    done();
  }, function (err) {
    process.stdout.write("e");
    console.log("ERROR: " + ua + "\nDemi error: " + err);
    done();
  });
}

function runTests (uas) {
  var lines = uas.split(/[\r\n]+/);
  console.log("Num UAs: " + lines.length);
  var i = 0;
  var doNextTest = function () {
    testUA(lines[i], function () {
      i++;
      if (i < lines.length) {
        doNextTest();
      } else {
        console.log("Finished.");
      }
    });
  };
  doNextTest();
}


fs.readFile('testdata/uas_28days_31Dec2014.txt', function (err, data) {
  runTests(data.toString());
});












