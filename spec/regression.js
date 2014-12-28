
var logDirect = function (str) { document.getElementById("output").innerHTML += str; };
var log = function (str) { logDirect("<p>"+str+"</p>"); };


log("Loaded " + tests.length + " tests");

// Parse demi file
var matchers = SemiDemi.parse(demiFile);
log("Loaded " + matchers.length + " matchers");

// Run the tests
logDirect("<p>");
for (var i=0; i < tests.length; i++) {
  var result = SemiDemi.bestMatch(matchers, tests[i].uagent);
  if (!result) {
    logDirect("x ");
    var msg = "<p>No match found for: "+tests[i].uagent;
    msg += "<br />Expected: "+expected+"</p>";
    document.getElementById("errors").innerHTML += msg;
    continue;
  }
  var expected = tests[i].wurfl_id;
  var actual = result[0].brand+"_"+result[0].model;
  if (expected.toLowerCase() === actual.toLowerCase()) {
    logDirect(". ");
  } else {
    logDirect("x ");
    var msg = "<p>FAIL: "+tests[i].uagent;
    if (result) {
      msg += "<br />Expected: "+expected;
      msg += "<br />Actual: "+actual;
    }
    msg += "</p>";
    document.getElementById("errors").innerHTML += msg;
  }
}
logDirect("</p>");


// Output the results


