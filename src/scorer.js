var SemiDemi = (function (SemiDemi) {

  // Score a useragent string against a SemiDemi matcher.
  // The higher the score, the worse the match, so a score of zero represents an exact match.
  SemiDemi.score = function (matcher, ua) {
    var score = ua.length;
    if (!matcher || matcher.constructor !== Array) { return score; }
    for (var i = 0; i < matcher.length; i++) {
      if (matcher[i].fuzzy) { score -= matcher[i].fuzzy.length; }
    }
    return score;
  }

  return SemiDemi;

} ( SemiDemi || {} ));
