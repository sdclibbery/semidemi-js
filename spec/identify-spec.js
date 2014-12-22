describe("Identify", function() {

  it("matches chrome", function() {
    var out = SemiDemi.identify( "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36" );
    expect(out[0].brand).toBe("google");
    expect(out[0].model).toBe("chrome");
  });

  it("matches samsung generic", function() {
    var out = SemiDemi.identify( "Mozilla/5.0 (SmartHub; SMART-TV; U; Linux/SmartTV; Maple2012) AppleWebKit/534.7 (KHTML, like Gecko) SmartTV Safari/534.7" );
    expect(out[0].brand).toBe("samsung");
    expect(out[0].model).toBe("generic");
  });

});