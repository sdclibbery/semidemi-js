var SemiDemi = (function (SemiDemi) {

  SemiDemi.parse = function (input) {
    var matchers = [];
    var result = parseMatcher(input);
    if (result) { matchers.push(result); }
    return matchers;
  };

  var topRegex = /\s*([^\s]+)\s+([^:\s]+)\s*:\s*(.*)/;
  var parseMatcher = function (input) {
    var sections = input.match(topRegex);
    if (!sections) { return null; }
    var brand = sections[1];
    var model = sections[2];
    return [
      { brand: brand, model: model },
      { fuzzy: sections[3] } // Temp
    ];
  };

  return SemiDemi;
}) ( SemiDemi || {} );
