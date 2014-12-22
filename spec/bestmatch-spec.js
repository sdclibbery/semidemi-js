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

});