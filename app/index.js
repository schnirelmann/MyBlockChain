const express = require("express");
const BodyParser = require("body-parser");
const BlockChain = require("../block_chain");
const P2pServer = require("./p2p-server");

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
const bc = new BlockChain();
const p2pServer = new P2pServer(bc);

app.use(BodyParser.json());

app.get("/blocks", (req, res) => {
  res.json(bc.chain);
});

app.post("/mine", (req, res) => {
  const new_block = bc.addBlock(req.body.data);
  console.log(`New block added: ${new_block.toString}`);

  p2pServer.synchronizeChains();

  res.redirect("/blocks");
});

app.listen(HTTP_PORT, console.log(`Listening on port ${HTTP_PORT}`));
p2pServer.listen();
