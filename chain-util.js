const EllipticCrypto = require("elliptic").ec;
const ec = new EllipticCrypto("secp256k1");

class ChainUtility {
  static genKeyPair() {
    return ec.genKeyPair();
  }
}

module.exports = ChainUtility;
