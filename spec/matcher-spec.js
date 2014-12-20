describe("Matcher", function() {


  it("matches empty matcher", function() {
    expect(SemiDemi.matches( [ ], "abc" )).toBe(true);
  });


  it("matches an exact invariant", function() {
    expect(SemiDemi.matches( [ { invariant: "abc" } ], "abc" )).toBe(true);
  });

  it("doesn't match an incorrect invariant", function() {
    expect(SemiDemi.matches( [ { invariant: "abc" } ], "abd" )).toBe(false);
  });

  it("matches a prefix subset invariant", function() {
    expect(SemiDemi.matches( [ { invariant: "ab" } ], "abc" )).toBe(true);
  });

  it("matches a postfix subset invariant", function() {
    expect(SemiDemi.matches( [ { invariant: "bc" } ], "abc" )).toBe(true);
  });

  it("matches an infix subset invariant", function() {
    expect(SemiDemi.matches( [ { invariant: "b" } ], "abc" )).toBe(true);
  });

  it("matches two invariants", function() {
    expect(SemiDemi.matches( [ { invariant: "a" }, { invariant: "c" } ], "abc" )).toBe(true);
  });

  it("doesn't match two invariants when one is incorrect", function() {
    expect(SemiDemi.matches( [ { invariant: "ab" }, { invariant: "cd" } ], "abc" )).toBe(false);
  });

  it("matches two invariants even if they overlap", function() {
    expect(SemiDemi.matches( [ { invariant: "ab" }, { invariant: "bc" } ], "abc" )).toBe(true);
  });


  it("matches disallowed when not present", function() {
    expect(SemiDemi.matches( [ { disallowed: "d" } ], "abc" )).toBe(true);
  });

  it("doesn't match disallowed when present", function() {
    expect(SemiDemi.matches( [ { disallowed: "d" } ], "abcd" )).toBe(false);
  });

});
