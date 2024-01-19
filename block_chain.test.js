const BlockChain = require("./block_chain");
const Block = require("./block");

describe("BlockChain", () => {
  let bc, bc2;

  beforeEach(() => {
    bc = new BlockChain();
    bc2 = new BlockChain();
  });

  it("Begins with the genesis block", () => {
    expect(bc.chain[0]).toEqual(Block.genesis());
  });

  it("Adds a new block", () => {
    const data = "random data";
    bc.addBlock(data);

    expect(bc.chain[bc.chain.length - 1].data).toEqual(data);
  });

  it("Checks validity of a chain", () => {
    bc2.addBlock("Some Data");
    expect(bc.isValidChain(bc2.chain)).toBe(true);
  });

  it("Checks validity genesis block", () => {
    bc2.chain[0].data = "Faulty Data";
    expect(bc.isValidChain(bc2.chain)).toBe(false);
  });

  it("Checks if a chain has a corrupt block", () => {
    bc2.addBlock("Some Data");
    bc2.chain[1].data = "Corrupt Data";

    expect(bc.isValidChain(bc2.chain)).toBe(false);
  });

  it("Replaces current chain with new chain if the new chain is longer and valid", () => {
    bc2.addBlock("Block Data");
    bc.replaceChain(bc2.chain);

    expect(bc.chain).toEqual(bc2.chain);
  });

  it("Does not replace chain if the new chain is not longer than the current chain", () => {
    bc.addBlock("Block Data");
    bc.replaceChain(bc2.chain);

    expect(bc.chain).not.toEqual(bc2.chain);
  });
});
