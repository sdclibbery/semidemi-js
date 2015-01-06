var SemiDemi = (function (SemiDemi) {

  var before = Date.now();
  var matchers = SemiDemi.parse(demiFile);
  SemiDemi.timeTakenToParseDemiFile = Date.now() - before;

  // Identify the current device.
  // Pass the user agent string if its known, or leave blank (in client browser) to extract UA from navigator object.
  // Returns a matcher, which is an array where the first element is an object with 'brand' and 'model' properties.
  // Returns null if no valid match could be found.
  SemiDemi.identify = function (ua) {
    if (ua === undefined) {
      ua = navigator.userAgent;
    }
    return SemiDemi.bestMatch(matchers, ua);
  };

  // Get a brand_model id from a matcher
  SemiDemi.matcherToId = function (matcher) {
    if (!matcher) { return null; }
    return matcher[0].brand + "_" + matcher[0].model;
  };

  return SemiDemi;

}) ( SemiDemi || {} );
