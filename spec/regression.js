
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
log("info", "Loaded " + tests.length + " tests");

// Parse demi file
var matchers = SemiDemi.parse(demiFile);
log("info", "Loaded " + matchers.length + " matchers");

// Run the tests
var runTest = function (i) {
  var result = SemiDemi.bestMatch(matchers, tests[i].uagent);
  var expected = tests[i].wurfl_id;
  if (!result) {
    logDirect("results", "x ");
    var msg = "**No match found*/* for: "+tests[i].uagent;
    msg += "\n> Expected: "+expected+"";
    log("errors", msg);
    return;
  }
  var actual = result[0].brand+"_"+result[0].model;
  if (expected.toLowerCase() === actual.toLowerCase()) {
    logDirect("results", ". ");
  } else {
    logDirect("results", "x ");
    var msg = "**FAIL*/*: "+tests[i].uagent;
    if (result) {
      msg += "\n> Expected: "+expected;
      msg += "\n> Actual: "+actual;
    }
    log("errors", msg);
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
  }
}
var testNumber = 0;
setTimeout(executeTest, 0);


