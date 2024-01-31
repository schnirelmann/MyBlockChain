const Wallet = require("./index");
const Transaction = require("./transaction");
const TransactionPool = require("./transaction-pool");

describe("Wallet", () => {
  let wallet, transactionPool, amountTosend, recipient;

  beforeEach(() => {
    wallet = new Wallet();
    transactionPool = new TransactionPool();
  });

  describe("creating transaction", () => {
    let transaction, amountToSend, recipient;

    beforeEach(() => {
      amountToSend = 43;
      recipient = "i2oj42w";
      transaction = wallet.createTransaction(
        recipient,
        amountToSend,
        transactionPool
      );
    });

    describe("Repeating transaction", () => {
      beforeEach(() => {
        wallet.createTransaction(recipient, amountToSend, transactionPool);
      });

      it("doubles the amount sent to the recipient", () => {
        expect(
          transaction.outputs.find(
            (output) => output.publicKey === wallet.publicKey
          ).amount
        ).toEqual(wallet.balance - amountToSend * 2);
      });

      it("clones the amount sent for the recipeint", () => {
        expect(
          transaction.outputs
            .filter((output) => output.publicKey === recipient)
            .map((output) => output.amount)
        ).toEqual([amountToSend, amountToSend]);
      });
    });
  });
});
