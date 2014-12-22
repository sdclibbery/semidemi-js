var SemiDemi = (function (SemiDemi) {

  var matchers = [
    [ { brand: "google", model: "chrome" }, { fuzzy: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) " }, { invariant: "Chrome" }, { fuzzy: "/39.0.2171.71 Safari/537.36" } ],
    [ { brand: "samsung", model: "pe5" }, { fuzzy: "Mozilla/5.0 (SmartHub; " }, { invariant: "SMART-TV" }, { fuzzy: "; U; Linux/SmartTV; " }, { invariant: "Maple2012" }, { fuzzy: ") AppleWebKit/534.7 (KHTML, like Gecko) SmartTV Safari/534.7 " }, { invariant: "Series=5000(TV)" } ]
  ];

  SemiDemi.identify = function (ua) {
    if (ua === undefined) {
      ua = navigator.userAgent;
    }
    return SemiDemi.bestMatch(matchers, ua);
  };

  return SemiDemi;

}) ( SemiDemi || {} );
