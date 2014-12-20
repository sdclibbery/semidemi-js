var SemiDemi = (function (SemiDemi) {

  // Score a useragent string against a SemiDemi matcher.
  // The higher the score, the worse the match, so a score of zero represents an exact match.
  SemiDemi.score = function (matcher, ua) {
    var constructed = "";
    var normalised = ua;
    for (var i = 0; i < matcher.length; i++) {
      if (matcher[i].fuzzy) { constructed += matcher[i].fuzzy; }
      if (matcher[i].invariant) { constructed += matcher[i].invariant; }
      if (matcher[i].version) {
        constructed += matcher[i].version;
        normalised = normalised.replace(buildNormalisationRegEx(matcher[i].version), matcher[i].version);
      }
    }
    return editDistance(normalised, constructed);
  };

  var buildNormalisationRegEx = function (prefix) {
    prefix = prefix.replace(/\\/g, "\\\\");
    prefix = prefix.replace(/\*/g, "\\*");
    prefix = prefix.replace(/\./g, "\\.");
    prefix = prefix.replace(/\[/g, "\\[");
    prefix = prefix.replace(/\]/g, "\\]");
    prefix = prefix.replace(/\+/g, "\\+");
    prefix = prefix.replace(/\-/g, "\\-");
    prefix = prefix.replace(/\?/g, "\\?");
    prefix = prefix.replace(/\(/g, "\\(");
    prefix = prefix.replace(/\)/g, "\\)");
    prefix = prefix.replace(/\^/g, "\\^");
    prefix = prefix.replace(/\$/g, "\\$");
    prefix = prefix.replace(/\!/g, "\\!");
    prefix = prefix.replace(/\&/g, "\\&");
    return new RegExp (prefix + "[0-9._]+");
  };

  var editDistance = function (a, b) {
    if(a.length === 0) return b.length; 
    if(b.length === 0) return a.length; 
   
    var matrix = [];
   
    // increment along the first column of each row
    var i;
    for(i = 0; i <= b.length; i++){
      matrix[i] = [i];
    }
   
    // increment each column in the first row
    var j;
    for(j = 0; j <= a.length; j++){
      matrix[0][j] = j;
    }
   
    // Fill in the rest of the matrix
    for(i = 1; i <= b.length; i++){
      for(j = 1; j <= a.length; j++){
        if(b.charAt(i-1) == a.charAt(j-1)){
          matrix[i][j] = matrix[i-1][j-1];
        } else {
          matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                  Math.min(matrix[i][j-1] + 1, // insertion
                                           matrix[i-1][j] + 1)); // deletion
        }
      }
    }
   
    return matrix[b.length][a.length];
  };

  return SemiDemi;

} ( SemiDemi || {} ));
