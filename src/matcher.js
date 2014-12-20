var SemiDemi = (function (SemiDemi) {

  SemiDemi.matches = function (matcher, ua) {
    if (!matcher || matcher.constructor !== Array) { return false; }
    for (var i = 0; i < matcher.length; i++) {
      if (matcher[i].invariant && !contains(ua, matcher[i].invariant)) { return false; }
      if (matcher[i].disallowed && contains(ua, matcher[i].disallowed)) { return false; }
    }
    return true;
  }

  var contains = function (haystack, needle) {
    return haystack.indexOf(needle) >= 0;
  }

  return SemiDemi;

} ( SemiDemi || {} ));
