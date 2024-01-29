const Transaction = require("./transaction");
const Wallet = require("./index");

describe("Transaction", () => {
  let transaction, senderWallet, recipient, amountToSend;

  beforeEach(() => {
    senderWallet = new Wallet();
    amountToSend = 43;
    recipient = "r8li832kl";
    transaction = Transaction.newTransaction(
      senderWallet,
      recipient,
      amountToSend
    );
  });

  it("substracts the sended amount from senderWallet balance", () => {
    expect(
      transaction.outputs.find(
        (output) => output.publicKey === senderWallet.publicKey
      ).amount
    ).toEqual(senderWallet.balance - amountToSend);
  });

  it("ouputs the `amountToSend` sent to the recipient", () => {
    expect(
      transaction.outputs.find((output) => output.publicKey === recipient)
        .amount
    ).toEqual(amountToSend);
  });

  describe("Invalid Transaction tries to send more than balance", () => {
    beforeEach(() => {
      amountToSend = 999999;
      transaction = Transaction.newTransaction(
        senderWallet,
        recipient,
        amountToSend
      );
    });

    it("Transaction is not created due to invalid amount", () => {
      expect(transaction).toEqual(undefined);
    });
  });
});
