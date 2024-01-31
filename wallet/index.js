const { INITIAL_BALANCE } = require("../config");
const ChainUtility = require("../chain-util");
const Transaction = require("./transaction");

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

  createTransaction(recipient, amountToTransfer, transactionPool) {
    if (amountToTransfer > this.balance) {
      console.log(`Amount ${amount} exceeds current balance ${this.balance}`);
      return;
    }

    let transaction = transactionPool.checkIfTransactionExists(this.publicKey);

    if (transaction) {
      transaction.updateTransaction(this, recipient, amountToTransfer);
      return;
    } else {
      transaction = Transaction.newTransaction(
        this,
        recipient,
        amountToTransfer
      );
      transactionPool.updateOrAddTransaction(transaction);
    }

    return transaction;
  }
}

module.exports = Wallet;
