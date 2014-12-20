describe("BestMatch", function() {

  it("doesnt match empty array", function() {
    expect(SemiDemi.bestMatch( [ ], "def" )).toBe(null);
  });

  it("doesnt match when invariant isn't present", function() {
    expect(SemiDemi.bestMatch( [ { invariant: "abc" } ], "def" )).toBe(null);
  });

});