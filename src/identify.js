var SemiDemi = (function (SemiDemi) {

  var matchers = [
    [ { brand: "google", model: "chrome" }, { fuzzy: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) " }, { invariant: "Chrome" }, { fuzzy: "/39.0.2171.71 Safari/537.36" } ],
    [ { brand: "mozilla", model: "firefox" }, { fuzzy: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:33.0) Gecko/20100101 " }, { invariant: "Firefox" }, { fuzzy: "/33.0" } ],
    [ { brand: "samsung", model: "generic" }, { fuzzy: "Mozilla/5.0 (SmartHub; " }, { invariant: "SMART-TV" }, { fuzzy: "; U; Linux/SmartTV; " }, { invariant: "Maple2012" }, { fuzzy: ") AppleWebKit/534.7 (KHTML, like Gecko) SmartTV Safari/534.7 " } ]
  ];

  // Identify the current device.
  // Pass the user agent string if its known, or leave blank (in client browser) to extract UA from navigator object.
  // Returns a matcher, which is an array where the first element is an object with 'brand' and 'model' properties.
  SemiDemi.identify = function (ua) {
    if (ua === undefined) {
      ua = navigator.userAgent;
    }
    return SemiDemi.bestMatch(matchers, ua);
  };

  return SemiDemi;

}) ( SemiDemi || {} );
