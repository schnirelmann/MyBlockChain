const ChainUtility = require("../chain-util");
const Wallet = require("./index");

class Transaction {
  constructor() {
    this.id = ChainUtility.id();
    this.input = null;
    this.outputs = [];
  }

  updateTransaction(senderWallet, recipient, amount) {
    const senderOutput = this.outputs.find(
      (output) => output.publicKey === senderWallet.publicKey
    );

    if (amount > senderOutput.amount) {
      console.log(`Amount ${amount} exceeds balance! Transaction aborted.`);
      return;
    }

    senderOutput.amount = senderOutput.amount - amount;
    this.outputs.push({ amount, publicKey: recipient });
    Transaction.signTransaction(this, senderWallet);

    return this;
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

    Transaction.signTransaction(transaction, senderWallet);

    return transaction;
  }

  static signTransaction(transaction, senderWallet) {
    transaction.input = {
      timeStamp: Date.now(),
      amount: senderWallet.balance,
      publicKey: senderWallet.publicKey,
      signature: senderWallet.signature(ChainUtility.hash(transaction.outputs)),
    };
  }

  static verifyTransaction(transaction) {
    return ChainUtility.verifySignature(
      transaction.input.publicKey,
      transaction.input.signature,
      ChainUtility.hash(transaction.outputs)
    );
  }
}

module.exports = Transaction;
