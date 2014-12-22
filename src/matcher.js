var SemiDemi = (function (SemiDemi) {

  // Match a useragent string against a SemiDemi Matcher structure
  // Returns true if the useragent matches.
  // The Matcher structure is an array of objects, each of which has a single property
  // The properties can be one of:
  // invariant: a string that must be exactly present in the ua for it to match
  // disallowed: a string that must _not_ be present in the ua for it to match
  SemiDemi.matches = function (matcher, ua) {
    if (!matcher || matcher.constructor !== Array) { return false; }
    for (var i = 0; i < matcher.length; i++) {
      if (matcher[i].invariant && !contains(ua, matcher[i].invariant)) { return false; }
      else if (matcher[i].disallowed && contains(ua, matcher[i].disallowed)) { return false; }
    }
    return true;
  };

  var contains = function (haystack, needle) {
    return haystack.indexOf(needle) >= 0;
  };

  return SemiDemi;

}) ( SemiDemi || {} );
