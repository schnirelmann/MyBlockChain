const WebSocket = require("ws");

const P2P_PORT = process.env.P2P_PORT || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(",") : [];
const MESSAGE_TYPES = {
  chain: "CHAIN",
  transaction: "TRANSACTION",
};

class P2pServer {
  constructor(blockchain, transactionsPool) {
    this.blockchain = blockchain;
    this.transactionsPool = transactionsPool;
    this.sockets = [];
  }

  listen() {
    const server = new WebSocket.Server({ port: P2P_PORT });
    server.on("connection", (socket) => this.connectSocket(socket));

    this.connectToPeers();

    console.log(`Listening for P2P connections on: ${P2P_PORT}`);
  }

  connectToPeers() {
    peers.forEach((peer) => {
      // A peer looks like: ws://localhost:5001
      const socket = new WebSocket(peer);

      socket.on("open", () => this.connectSocket(socket));
    });
  }

  connectSocket(socket) {
    this.sockets.push(socket);
    console.log("Socket connected");

    this.messageHandler(socket);

    this.sendChain(socket);
  }

  messageHandler(socket) {
    socket.on("message", (message) => {
      const data = JSON.parse(message);

      this.blockchain.replaceChain(data);
    });
  }

  sendChain(socket) {
    socket.send(
      JSON.stringify({
        type: MESSAGE_TYPES.chain,
        chain: this.blockchain.chain,
      })
    );
  }

  sendTransaction(socket, transaction) {
    socket.send(
      JSON.stringify({
        type: MESSAGE_TYPES.transaction,
        transaction,
      })
    );
  }

  synchronizeChains() {
    this.sockets.forEach((socket) => this.sendChain(socket));
  }

  broadcastTransaction(transaction) {
    this.sockets.forEach((socket) => this.sendTransaction(socket, transaction));
  }
}

// $ HTTP_PORT = 3002 P2P_PORT = 5003 PEERS = ws: //localhost:5001, ws: //localhost:5002 npm run dev

module.exports = P2pServer;
