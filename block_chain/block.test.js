const Block = require("./block");

describe("Block", () => {
  let data, lastBlock, block;

  beforeEach(() => {
    data = "bar";
    lastBlock = Block.genesis();
    block = Block.mineBlock(lastBlock, data);
  });

  it("check that `data` equals the input", () => {
    expect(block.data).toEqual(data);
  });

  it("check that `lastHash` equals the hash of the last block", () => {
    expect(block.lastHash).toEqual(lastBlock.hash);
  });

  it("check that 'hash' matches the difficulty", () => {
    expect(block.hash.substring(0, block.difficulty)).toEqual(
      "0".repeat(block.difficulty)
    );
  });

  it("check that difficulty goes down when the mining is slow", () => {
    expect(Block.adjustDifficulty(block, block.timestamp + 360000)).toEqual(
      block.difficulty - 1
    );
  });

  it("check that difficulty goes up when the mining is fast", () => {
    expect(Block.adjustDifficulty(block, block.timestamp + 1)).toEqual(
      block.difficulty + 1
    );
  });
});
