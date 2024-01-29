const ChainUtility = require("../chain-util");
const Wallet = require("./index");

/**
 * Creates a new transaction.
 * @param {Wallet} senderWallet - The wallet of the sender.
 */
class Transaction {
  constructor() {
    this.id = ChainUtility.id();
    this.input = null;
    this.outputs = [];
  }

  static newTransaction(senderWallet, recipient, amount) {
    const transaction = new this();

    if (amount > senderWallet.balance) {
      console.log(`Amount ${amount} exceeds balance! Transaction aborted.`);
      return;
    }

    transaction.outputs.push(
      ...[
        {
          amount: senderWallet.balance - amount,
          publicKey: senderWallet.publicKey,
        },
        { amount, publicKey: recipient },
      ]
    );

    return transaction;
  }
}

module.exports = Transaction;
