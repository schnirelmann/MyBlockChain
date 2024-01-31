const TransactionPool = require("./transaction-pool");
const Transaction = require("./transaction");
const Wallet = require("./index");

describe("TransactionPool", () => {
  let transactionPool, transaction, senderWallet, amountToSend;

  beforeEach(() => {
    transactionPool = new TransactionPool();
    senderWallet = new Wallet();
    amountToSend = 43;
    transaction = Transaction.newTransaction(
      senderWallet,
      "i2oj42w",
      amountToSend
    );
    transactionPool.updateOrAddTransaction(transaction);
  });

  it("transactions are added to the pool", () => {
    expect(
      transactionPool.transactions.find((t) => t.id === transaction.id)
    ).toEqual(transaction);
  });

  it("updates transaction in the pool", () => {
    const oldTransaction = JSON.stringify(transaction);
    const newTransaction = transaction.updateTransaction(
      senderWallet,
      "i2oi9-j42w",
      20
    );
    transactionPool.updateOrAddTransaction(newTransaction);
    expect(
      JSON.stringify(
        transactionPool.transactions.find((t) => t.id === newTransaction.id)
      )
    ).not.toEqual(oldTransaction);
  });
});
