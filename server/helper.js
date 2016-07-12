var db = require('./db/db.js');

exports.isValidID = function(id) {
  if (id >= 0 && id < db.length) {
    return true;
  }
  return false;
};

exports.isValidVote = function(vote) {
  if (vote >= 1 && vote <= 5) {
    return true;
  }
  return false;
};

exports.addVote = function(id, newVote) {
  var design = db[id];
  design.averageVote = (design.averageVote * design.voteCount + newVote) / (design.voteCount + 1);
  design.voteCount++;
};
