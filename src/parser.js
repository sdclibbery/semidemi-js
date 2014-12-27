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
    while (matcher !== "") {
      var i = matcher.indexOf("[");
      if (i === -1) {
        result.push({ fuzzy: matcher });
        break;
      } else if (i > 0) {
        result.push({ fuzzy: matcher.substr(0, i) });
        matcher = matcher.substr(i);
      }
      i = matcher.indexOf("]");
      if (i === -1) {
        throw "Syntax Error: Unterminated '[' on line "+lineNum;
      } else {
        result.push({ invariant: matcher.substr(2, i-2) });
        matcher = matcher.substr(i+1);
      }
    }
    return result;
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
