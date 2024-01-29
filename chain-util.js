const EllipticCrypto = require("elliptic").ec;
const { v1: uuidV1 } = require("uuid");
const ec = new EllipticCrypto("secp256k1");

class ChainUtility {
  static genKeyPair() {
    return ec.genKeyPair();
  }

  static id() {
    return uuidV1();
  }
}

module.exports = ChainUtility;
