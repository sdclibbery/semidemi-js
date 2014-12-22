describe("BestMatch", function() {

  it("doesnt match empty array", function() {
    expect(SemiDemi.bestMatch( [ ], "def" )).toBe(null);
  });

  it("doesnt match when invariant isn't present", function() {
    expect(SemiDemi.bestMatch( [ { invariant: "abc" } ], "def" )).toBe(null);
  });

  describe("returns one result when one matcher matches", function () {

    var inv = function (str) {
      return [ { invariant: str } ];
    };

    it("one exact", function() {
      expect(SemiDemi.bestMatch( [ inv("abc") ], "abc" )).toEqual(inv("abc"));
    });

    it("first exact", function() {
      expect(SemiDemi.bestMatch( [ inv("abc"), inv("def") ], "abc" )).toEqual(inv("abc"));
    });

    it("second exact", function() {
      expect(SemiDemi.bestMatch( [ inv("def"), inv("abc") ], "abc" )).toEqual(inv("abc"));
    });

  });

  describe("returns the best result when multiple matchers match", function () {

    var m = function (str) {
      return [ { fuzzy: str }, { invariant: "WooHoo" } ];
    };

    it("first matcher is best", function() {
      expect(SemiDemi.bestMatch( [ m("abc"), m("def") ], "abcWooHoo" )).toEqual(m("abc"));
    });

    it("second matcher is best", function() {
      expect(SemiDemi.bestMatch( [ m("abc"), m("def") ], "defWooHoo" )).toEqual(m("def"));
    });

    it("longer matcher is best", function() {
      expect(SemiDemi.bestMatch( [ m("def"), m("defdef") ], "defdefWooHoo" )).toEqual(m("defdef"));
    });

  });

  describe("returns the best result with version normalisation", function () {

    var m = function (str) {
      return [ { fuzzy: str }, { version: "c" } ];
    };

    it("first matcher is best", function() {
      expect(SemiDemi.bestMatch( [ m("abc"), m("ab c") ], "abc123" )).toEqual(m("abc"));
    });

    it("version aware matcher is best", function() {
      expect(SemiDemi.bestMatch( [ m("abc123"), m("abc") ], "abc123" )).toEqual(m("abc"));
    });

  });

  describe("example", function () {

    var m1 = [ { brand: "sony", model: "playstation" }, { version: "Mozilla/" }, { fuzzy: " (" }, { invariant: "PLAYSTATION 3" }, { fuzzy: "; 1.00" }, { disallowed: "feet" } ];
    var m2 = [ { brand: "sony", model: "playstation" }, { version: "Mozilla/" }, { fuzzy: " (" }, { invariant: "PLAYSTATION 3" }, { fuzzy: "; 2.00" }, { disallowed: "feet" } ];

    it("picks the best match", function() {
      expect(SemiDemi.bestMatch( [ m1, m2 ], "Mozilla/5.0 (PLAYSTATION 3; 2.00)" )).toEqual(m2);
    });

  });

});