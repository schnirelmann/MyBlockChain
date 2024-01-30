const EllipticCrypto = require("elliptic").ec;
const SHA256 = require("crypto-js/sha256");
const { v1: uuidV1 } = require("uuid");
const ec = new EllipticCrypto("secp256k1");

class ChainUtility {
  static genKeyPair() {
    return ec.genKeyPair();
  }

  static id() {
    return uuidV1();
  }

  static hash(data) {
    return SHA256(JSON.stringify(data)).toString();
  }

  static verifySignature(publicKey, signature, hashedData) {
    return ec.keyFromPublic(publicKey, "hex").verify(hashedData, signature);
  }
}

module.exports = ChainUtility;
