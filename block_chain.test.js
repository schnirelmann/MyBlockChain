const BlockChain = require('./block_chain');
const Block = require('./block');

describe('BlockChain', () => { 
    let bc;

    beforeEach(() => {
        bc = new BlockChain();
    });

    it('Begins with the genesis block', () => {
        expect(bc.chain[0]).toEqual(Block.genesis());
    });

    it('Adds a new block', () => {
        const data = 'gooc data';
        bc.addBlock(data);

        expect(bc.chain[bc.chain.length - 1].data).toEqual(data);
    });
});