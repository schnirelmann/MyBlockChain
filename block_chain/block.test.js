const Block = require("./block");
const { DIFFICULTY } = require("../config");

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
    expect(block.hash.substring(0, DIFFICULTY)).toEqual("0".repeat(DIFFICULTY));
    console.log(block.toString());
  });
});
