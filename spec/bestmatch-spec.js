describe("BestMatch", function() {

  var inv = function (str) {
    return [ { invariant: str } ];
  };

  it("doesnt match empty array", function() {
    expect(SemiDemi.bestMatch( [ ], "def" )).toBe(null);
  });

  it("doesnt match when invariant isn't present", function() {
    expect(SemiDemi.bestMatch( [ inv("abc") ], "def" )).toBe(null);
  });

  describe("returns one result when one matcher matches", function () {

    it("one exact", function() {
      expect(SemiDemi.bestMatch( [ inv("abc") ], "abc" )).toEqual(inv("abc"));
    });

//    it("first exact", function() {
//      expect(SemiDemi.bestMatch( [ inv("abc"), inv("def") ], "abc" )).toBe(inv("abc"));
//    });

  });

});