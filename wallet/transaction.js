const ChainUtility = require("../chain-util");

class Transaction {
  constructor() {
    this.id = ChainUtility.id();
    this.input = null;
    this.output = [];
  }

  static newTransaction(senderWallet, recipient, amountToSend) {
    const transaction = new this();

    if (amountToSend > senderWallet.balance) {
      console.log(`Not enough money in wallet to make this transaction`);
      return;
    }

    transaction.output.push(
      ...[
        {
          amount: senderWallet.balance - amountToSend,
          publicKey: senderWallet.publicKey,
        },
        { amountToSend, publicKey: recipient },
      ]
    );
  }
}

module.exports = Transaction;
