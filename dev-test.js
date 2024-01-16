const Block = require('./block');

const goodBlock = Block.mineBlock(Block.genesis(), 'good data');
console.log(goodBlock.toString());