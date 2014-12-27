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
  var partRegex = /[\[\]]/;
  var invariantRegex = /\+([^\[\]]*)/;
  var parseMatcher = function (line, lineNum) {
    var sections = line.match(topRegex);
    if (!sections) { throw "Syntax Error at top level (brand model:matcher) on line "+lineNum; }
    var brand = sections[1];
    var model = sections[2];
    var result = [ { brand: brand, model: model } ];
    var matcher = sections[3];
    var parts = matcher.split(partRegex);
    if (!parts) { throw "Error: no invariants present on line "+lineNum; }
    for (var i = 0; i < parts.length; i++) {
      if (isEmptyLine(parts[i])) { continue; }
      var invariant = parts[i].match(invariantRegex);
      if (invariant) { result.push({ invariant: invariant[1] }); }
      else { result.push({ fuzzy: parts[i] }); }
    };
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
