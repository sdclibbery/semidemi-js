describe("Parser", function() {

  it("handles simple invariant matcher", function() {
    expect(SemiDemi.parse("brand model: [+abc]")).toEqual([ [ {brand: "brand", model: "model"}, {invariant: "abc"} ] ]);
  });

  it("produces no matchers for an empty file", function() {
    expect(SemiDemi.parse("")).toEqual([ ]);
  });

  it("handles various whitespace between sections", function() {
    expect(SemiDemi.parse("brand \tmodel  \t:\t [+abc]")).toEqual([ [ {brand: "brand", model: "model"}, {invariant: "abc"} ] ]);
  });

  it("handles two simple matchers", function() {
    expect(SemiDemi.parse("b m:[+abc]\nb m:[+def]")).toEqual([ [ {brand: "b", model: "m"}, {invariant: "abc"} ], [ {brand: "b", model: "m"}, {invariant: "def"} ] ]);
  });

  it("handles windows CRLF line breaks", function() {
    expect(SemiDemi.parse("b m:[+abc]\r\nb m:[+def]")).toEqual([ [ {brand: "b", model: "m"}, {invariant: "abc"} ], [ {brand: "b", model: "m"}, {invariant: "def"} ] ]);
  });

  it("reports syntax error", function() {
    expect(function () { SemiDemi.parse("bm:abc"); }).toThrow("Syntax Error at top level (brand model:matcher) on line 1");
  });

  it("allows comments", function() {
    expect(SemiDemi.parse("# Rubadub\nb m:[+abc]\n #Bubble\nb m:[+def]")).toEqual([ [ {brand: "b", model: "m"}, {invariant: "abc"} ], [ {brand: "b", model: "m"}, {invariant: "def"} ] ]);
  });

  it("allows empty lines", function() {
    expect(SemiDemi.parse("\n\n   \nb m:[+abc]\n\n\n\n\n#h\n\n\nb m:[+def]\n\n\n")).toEqual([ [ {brand: "b", model: "m"}, {invariant: "abc"} ], [ {brand: "b", model: "m"}, {invariant: "def"} ] ]);
  });

  it("handles fuzzy", function() {
    expect(SemiDemi.parse("b m:abc[+def]ghi[+jkl][+mno]pqr")).toEqual([ [ {brand: "b", model: "m"}, {fuzzy: "abc"}, {invariant: "def"}, {fuzzy: "ghi"}, {invariant: "jkl"}, {invariant: "mno"}, {fuzzy: "pqr"} ] ]);
  });

  // Report unmatched [] as error
  // Reports matchers with no invariants as errors
  // Disallowed
   // Errors
  // Version
   // Errors
});
