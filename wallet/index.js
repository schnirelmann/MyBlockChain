const { INITIAL_BALANCE } = require("../config");
const ChainUtility = require("../chain-util");

class Wallet {
  constructor() {
    this.balance = INITIAL_BALANCE;
    this.keyPair = ChainUtility.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode("hex");
  }

  toString() {
    return `Wallet:
        publicKey: ${this.publicKey.toString()}
        balance  : ${this.balance}`;
  }

  signature(dataHash) {
    return this.keyPair.sign(dataHash);
  }
}

module.exports = Wallet;
