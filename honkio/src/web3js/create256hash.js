//const crypto = require('crypto');
const { createHash } = require('crypto-browserify')

const create256Hash = (...args) => {
  // Skapa ett objekt ifrån nodes crypto bibliotek...
  // Ange algoritm(sha256)
  
  const hash = createHash('sha256');
  // Skapa en hash av våra inskickade argument...
  hash.update(args.sort().join(' '));
  // Beräkna värdet baserat på algoritm, inskickade argument och
  // skapa en output i hex format...
  return hash.digest('hex');
};

module.exports = create256Hash;