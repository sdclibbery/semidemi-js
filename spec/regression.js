
var escapeHtml = function (unsafe) {
  return unsafe
       .replace(/&/g, "&amp;")
       .replace(/</g, "&lt;")
       .replace(/>/g, "&gt;")
       .replace(/"/g, "&quot;")
       .replace(/'/g, "&#039;")
       .replace(/\*\*/g, "<b>")
       .replace(/\*\/\*/g, "</b>")
       .replace(/\n/g, "<br />");
}
var logDirect = function (type, str) { document.getElementById(type).innerHTML += str; };
var log = function (type, str) { logDirect(type, "<p>"+escapeHtml(str)+"</p>"); };


log("info", "**SemiDemi regression tests*/*");

// Parse demi file
var before = Date.now();
var matchers = SemiDemi.parse(demiFile);
var timeTakenToParseDemiFile = Date.now() - before;
log("info", matchers.length + " matchers; " + tests.length + " tests");
log("info", "Time taken to parse demi file: "+timeTakenToParseDemiFile+"ms");


// Run the tests
var slowest = 0;
var failures = 0;
var runTest = function (i) {
  var expected = tests[i].wurfl_id;

  var before = Date.now();
  var result = SemiDemi.bestMatch(matchers, tests[i].uagent);
  var timeTaken = Date.now() - before;
  if (timeTaken > slowest) {
    slowest = timeTaken;
    slowestId = expected;
  }

  if (!result) {
    logDirect("results", "x ");
    var msg = "**No match found*/* for: "+tests[i].uagent;
    msg += "\n> Expected: "+expected+"";
    log("errors", msg);
    failures++;
    return;
  }
  var actual = result[0].brand+"_"+result[0].model;
  if (expected === actual) {
    logDirect("results", ". ");
  } else {
    logDirect("results", "x ");
    var msg = "**FAIL*/*: "+tests[i].uagent;
    if (result) {
      msg += "\n> Expected: "+expected;
      msg += "\n> Actual: "+actual;
    }
    log("errors", msg);
    failures++;
  }
}

var executeTest = function () {
  for (var i = 0; i < 10; i++) {
    runTest(testNumber);
    testNumber++;
    if (testNumber >= tests.length) { break; }
  }
  if (testNumber < tests.length) {
    setTimeout(executeTest, 0);
  } else {
    if (failures == 0) {
      log("results", "**ALL TESTS PASSED*/*");
    } else {
      log("results", "**"+failures+" TEST(S) FAILED*/*");
    }
    log("results", "Slowest test: "+slowestId+" Took: "+slowest+"ms");
  }
}
var testNumber = 0;
setTimeout(executeTest, 0);


