var http = require('http');
var fs = require('fs');

eval(fs.readFileSync('./src/parser.js', 'utf8'));
eval(fs.readFileSync('./src/matcher.js', 'utf8'));
eval(fs.readFileSync('./src/scorer.js', 'utf8'));
eval(fs.readFileSync('./src/bestmatch.js', 'utf8'));

console.log("SemiDemi Regression Tests");

// !!! Turn this into regression tests :-)
// Reuse spec/regression.js if possible
// Run new regression data and update matchers
// Have a script to build tvs.demi.js from tvs.demi
// Run checker script and update matchers if required (may need ability to run it 'in sections'...)


var matchers = SemiDemi.parse(fs.readFileSync('./tvs.demi', 'utf8'));
var normaliseDemiValue = function (v) {
  return v.toLowerCase().replace(/[^a-z0-9]/g, "_");
}

var runTest = function (testdata) {
  var expected = normaliseDemiValue(testdata.brand) + "-" + normaliseDemiValue(testdata.model);
  var result = SemiDemi.bestMatch(matchers, testdata.uagent);

  if (!result) {
    if (expected === "generic-smarttv") {
      process.stdout.write(". ");
    } else {
      process.stdout.write("x ");
      var msg = "\n\n**No match found*/* for: "+testdata.uagent;
      msg += "\n> Expected: "+expected+"";
      console.log(msg);
    }
    return;
  }
  var actual = result[0].brand+"-"+result[0].model;
  if (expected === actual) {
    process.stdout.write(". ");
  } else {
    process.stdout.write("x ");
    var msg = "\n\n**FAIL*/*: "+testdata.uagent;
    if (result) {
      msg += "\n> Expected: "+expected;
      msg += "\n> Actual  : "+actual;
    }
    console.log(msg);
  }
}

function runTests (tests) {
  var start = 0;//process.argv[2] || 0;
  var end = 1010;//process.argv[3] || tests.length;
  console.log("Num UAs: " + tests.length);
  for (var i = start; i < end; i++) {
    runTest(tests[i]);
  }
  console.log("Finished");
}


runTests(JSON.parse(fs.readFileSync('testdata/testdata.json', 'utf8')));
