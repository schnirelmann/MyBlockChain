const Blockchain = require("./block_chain");

const bc = new Blockchain();

// adding 10 block to the block chain
for (let i = 0; i < 10; i++) {
  console.log(bc.addBlock(`NewBlock ${i}`).toString());
}
