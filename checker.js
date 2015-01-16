var http = require('http');
var fs = require('fs');

console.log("SemiDemi Checker");

function semidemi (ua) {
/*
  var result = SemiDemi.bestMatch(matchers, tests[i].uagent);
  if (!result) { return; }
  return result[0].brand+"_"+result[0].model;
*/
}

function demi (ua, succ, err) {
  var options = {
    host: 'pal.sandbox.dev.bbc.co.uk',
    path: 'frameworks/test/demi/php',
    headers: {'user-agent': ua},
  };
  http.get(options, function(res) {
    if (res.statusCode === 200) {
      succ(res.body);
    } else {
      err("response: "+res.statusCode);
    }
  }).on('error', function(e) {
    err(e.message);
  });
}

function testUA (ua, done) {
  demi(ua, function (demi) {
    // Getting 400's for everything from demi :-(
    // Need to parse the demi response HTML to find brand and model
    // Need to make semidemi() work
    if (semidemi(ua) === demi) {
      process.stdout.write(".");
    } else {
      process.stdout.write("x");
      console.log("FAILED: " + ua + "\nSemiDemi:  " + semidemi + "\nDemi: " + demi);
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












