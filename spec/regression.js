
var log = function (str) {
  document.getElementById("output").innerHTML += "<p>"+str+"</p>";
};

log("Loaded " + testFile.length + " tests");

// Parse demi file
var matchers = SemiDemi.parse(demiFile);
log("Loaded " + matchers.length + " matchers");

// Run the tests

// Output the results


