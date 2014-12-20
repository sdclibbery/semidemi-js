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


  it("basic version scoring", function() {
    expect(SemiDemi.score( [ { version: "abc" }, { fuzzy: "def" } ], "abc1.00def" )).toBe(0);
  });

  it("version scoring with special chars in version prefix", function() {
    expect(SemiDemi.score( [ { version: "a+-[]{}./?\\*()!£$%^&*())bc" }, { fuzzy: "def" } ], "a+-[]{}./?\\*()!£$%^&*())bc1.00def" )).toBe(0);
  });

  it("version normalising handles multiple part versions", function() {
    expect(SemiDemi.score( [ { version: "abc" }, { fuzzy: "def" } ], "abc1.0.0def" )).toBe(0);
  });

  it("version normalising handles long multiple part versions", function() {
    expect(SemiDemi.score( [ { version: "abc" }, { fuzzy: "def" } ], "abc999.9999.99999.999999def" )).toBe(0);
  });

  it("version normalising handles underscores", function() {
    expect(SemiDemi.score( [ { version: "abc" }, { fuzzy: "def" } ], "abc1.0_0def" )).toBe(0);
  });

  it("version normalising with ; prefix", function() {
    expect(SemiDemi.score( [ { version: "; " }, { fuzzy: "def" } ], "; 1.0_0def" )).toBe(0);
  });


  describe("examples", function () {
    var ps1 = [ { version: "Mozilla/" }, { fuzzy: " (" }, { invariant: "PLAYSTATION 3" }, { fuzzy: "; 1.00)" } ];
    var ps2 = [ { version: "Mozilla/" }, { fuzzy: " (" }, { invariant: "PLAYSTATION 3" }, { fuzzy: "; 2.00)" } ];
    var ps4 = [ { version: "Mozilla/" }, { fuzzy: " (" }, { invariant: "PLAYSTATION 3" }, { fuzzy: "; 4.77)" } ];

    it("specific version is scored", function () {
      expect(SemiDemi.score( ps1, "Mozilla/5.0 (PLAYSTATION 3; 2.00)" )).toBe(1);
    });

    it("exact score", function () {
      expect(SemiDemi.score( ps2, "Mozilla/5.0 (PLAYSTATION 3; 2.00)" )).toBe(0);
    });

    it("1.00 vs 4.70", function () {
      expect(SemiDemi.score( ps1, "Mozilla/2.0 (PLAYSTATION 3; 4.70)" )).toBe(2);
    });

    it("4.77 vs 4.70", function () {
      expect(SemiDemi.score( ps4, "Mozilla/2.0 (PLAYSTATION 3; 4.70)" )).toBe(1);
    });

  });

});