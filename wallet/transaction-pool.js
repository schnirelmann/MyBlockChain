class TransactionPool {
  constructor() {
    this.transactions = [];
  }

  checkIfTransactionExists(publicKey) {
    return this.transactions.find((t) => t.input.publicKey === publicKey);
  }

  updateOrAddTransaction(transaction) {
    let transactionWithId = this.transactions.find(
      (t) => t.id === transaction.id
    );

    if (transactionWithId) {
      this.transactions[this.transactions.indexOf(transactionWithId)] =
        transaction;
    } else {
      this.transactions.push(transaction);
    }
  }
}

module.exports = TransactionPool;
