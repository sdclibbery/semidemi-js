var SemiDemi = (function (SemiDemi) {

  SemiDemi.parse = function (input) {
    var matchers = [];
    var lines = input.split(/[\r\n]+/);
    for (var i = 0; i < lines.length; i++) {
      if (isEmptyLine(lines[i])) { continue; }
      if (isCommentLine(lines[i])) { continue; }
      matchers.push(parseMatcher(lines[i], i+1));
    }
    return matchers;
  };

  var topRegex = /\s*([^\s]+)\s+([^:\s]+)\s*:\s*(.*)/;
  var parseMatcher = function (line, lineNum) {
    var sections = line.match(topRegex);
    if (!sections) { throw "Syntax Error at top level (brand model:matcher) on line "+lineNum; }
    var brand = sections[1];
    var model = sections[2];
    var result = [ { brand: brand, model: model } ];
    var matcher = sections[3];
    var hasInvariant = false;
    var type;
    while (matcher !== "") {
      // Look for start of marked up section
      var i = matcher.indexOf("[");
      if (i === -1) {
        // No marked up sections remaining
        result.push({ fuzzy: matcher });
        break;
      } else if (i > 0) {
        // Add the fuzzy before the marked up section
        result.push({ fuzzy: matcher.substr(0, i) });
      }
      type = matcher.substr(i+1, 1);
      matcher = matcher.substr(i);
      // Look for end of marked up section
      i = matcher.indexOf("]");
      if (i === -1) {
        throw "Syntax Error: Unterminated '[' on line "+lineNum;
      } else if (type === "+") {
        result.push({ invariant: matcher.substr(2, i-2) });
        hasInvariant = true;
      } else if (type === "-") {
        result.push({ disallowed: matcher.substr(2, i-2) });
      } else if (type === "v") {
        result.push({ version: trimFromEnd(matcher.substr(2, i-2), /[0-9\-_\.]/) });
      } else {
        throw "Syntax Error: Invalid markup '["+type+"...]' on line "+lineNum;
      }
      matcher = matcher.substr(i+1);
    }
    if (!hasInvariant) { throw "Error: Matcher has no invariants on line "+lineNum; }
    return result;
  };

  var trimFromEnd = function (value, toTrim) {
    while (value[value.length-1].match(toTrim)) { value = value.substr(0, value.length-1); }
    return value;
  };

  var emptyLineRegex = /^\s*$/;
  var isEmptyLine = function (line) {
    return line.match(emptyLineRegex) !== null;
  };

  var commentLineRegex = /^\s*#.*$/;
  var isCommentLine = function (line) {
    return line.match(commentLineRegex) !== null;
  };

  return SemiDemi;
}) ( SemiDemi || {} );
