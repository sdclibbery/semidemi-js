var SemiDemi = (function (SemiDemi) {

  // Score a useragent string against a SemiDemi matcher.
  // The higher the score, the worse the match, so a score of zero represents an exact match.
  SemiDemi.score = function (matcher, ua) {
    var constructed = "";
    for (var i = 0; i < matcher.length; i++) {
      if (matcher[i].fuzzy) { constructed += matcher[i].fuzzy; }
      if (matcher[i].invariant) { constructed += matcher[i].invariant; }
    }
    return editDistance(ua, constructed);
  };

  var editDistance = function (a, b) {
    return a.length - b.length;
  };

  return SemiDemi;

} ( SemiDemi || {} ));
