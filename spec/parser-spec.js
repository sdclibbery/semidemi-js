describe("Parser", function() {

  it("handles simple fuzzy matcher", function() {
    expect(SemiDemi.parse("brand model: abc")).toEqual([ [ {brand: "brand", model: "model"}, {fuzzy: "abc"} ] ]);
  });

  it("produces no matchers for an empty file", function() {
    expect(SemiDemi.parse("")).toEqual([ ]);
  });

  it("handles various whitespace between sections", function() {
    expect(SemiDemi.parse("brand \tmodel  \t:\t abc")).toEqual([ [ {brand: "brand", model: "model"}, {fuzzy: "abc"} ] ]);
  });

  it("handles two simple matchers", function() {
    expect(SemiDemi.parse("b m:abc\nb m:def")).toEqual([ [ {brand: "b", model: "m"}, {fuzzy: "abc"} ], [ {brand: "b", model: "m"}, {fuzzy: "def"} ] ]);
  });

  it("handles windows CRLF line breaks", function() {
    expect(SemiDemi.parse("b m:abc\r\nb m:def")).toEqual([ [ {brand: "b", model: "m"}, {fuzzy: "abc"} ], [ {brand: "b", model: "m"}, {fuzzy: "def"} ] ]);
  });

  // Windows CRLF
  // Comments
  // Invariants
  // Disallowed
  // Version
});
