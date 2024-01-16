const Block = require('./block');

describe('Block', () => {
     let data, lastBlock, block;

     beforeEach(() => {
        data = 'bar';
        lastBlock = Block.genesis();
        block = Block.mineBlock(lastBlock, data);
     });

     it('check that `data` equals the input', () => {
        expect(block.data).toEqual('wrong data');
     });

     it('check that `lastHash` equals the hash of the last block', () => {
        expect(block.lastHash).toEqual('wrong hash');
     });
}); 