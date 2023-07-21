const express = require('express');
const app = express();
const server = require('http').createServer(app);
const WebSocket = require('ws');
const wss = new WebSocket.Server({ server });
const { TextEncoder, TextDecoder } = require('text-encoding');

const encoder = new TextEncoder();
const decoder = new TextDecoder();

app.use(express.static('public'));

const wordArr = ['苹果', '香蕉', '橙子', '汽车', '自行车', '电脑', '手机'];

function getRandomKeyword(arr) {
  let num = Math.floor(Math.random() * arr.length);
  return arr[num];
}

const initialKeyword = getRandomKeyword(wordArr);

console.log(`Keyword: ${initialKeyword}`);

let painter = null;
let currentKeyword = '';

function selectNewPainter() {
  const clients = Array.from(wss.clients).filter(client => client.readyState === WebSocket.OPEN);
  painter = clients[Math.floor(Math.random() * clients.length)];
  currentKeyword = getRandomKeyword(wordArr);
  console.log(`New painter: ${painter._socket.remoteAddress}, keyword: ${currentKeyword}`);
}

wss.on('connection', (ws) => {
  console.log('Client connected');

  if (!painter) {
    selectNewPainter();
  }

  ws.on('message', (message) => {
    const decodedMessage = decoder.decode(message);

    if (ws === painter) {
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(encoder.encode(`drawing:${message}`));
        }
      });
    } else {
      console.log(`Received guess: ${decodedMessage}`);

      if (decodedMessage === currentKeyword) {
        ws.send(encoder.encode('恭喜你，猜对了！'));
        selectNewPainter();
      } else {
        ws.send(encoder.encode('猜错了，请再试一次。'));
      }
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    if (ws === painter) {
      selectNewPainter();
    }
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});