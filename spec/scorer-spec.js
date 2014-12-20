describe("Scorer", function() {


  it("scores 1 per char with empty matcher", function() {
    expect(SemiDemi.score( [ ], "abc" )).toBe(3);
  });

  it("scores 0 when whole string is fuzzy", function() {
    expect(SemiDemi.score( [ { fuzzy: "abc" } ], "abc" )).toBe(0);
  });

  it("disallowed does not affect the score", function() {
    expect(SemiDemi.score( [ { fuzzy: "abc" }, { disallowd: "def" } ], "abc" )).toBe(0);
  });

  it("scores 0 when whole string is matched by two fuzzy items", function() {
    expect(SemiDemi.score( [ { fuzzy: "ab" }, { fuzzy: "c" } ], "abc" )).toBe(0);
  });

  it("scores 0 when whole string is matched fuzzy and invariant items", function() {
    expect(SemiDemi.score( [ { fuzzy: "a" }, { invariant: "b" }, { fuzzy: "c" } ], "abc" )).toBe(0);
  });

  it("scores 1 when one fuzzy char is different", function() {
    expect(SemiDemi.score( [ { fuzzy: "a_c" } ], "abc" )).toBe(1);
  });

  it("scores 1 when one fuzzy char is missing", function() {
    expect(SemiDemi.score( [ { fuzzy: "abc" } ], "ac" )).toBe(1);
  });

  it("scores 1 when one fuzzy char is extra", function() {
    expect(SemiDemi.score( [ { fuzzy: "ac" } ], "abc" )).toBe(1);
  });


  it("basic version matching", function() {
    expect(SemiDemi.score( [ { version: "abc" }, { fuzzy: "def" } ], "abc1.00def" )).toBe(0);
  });


});