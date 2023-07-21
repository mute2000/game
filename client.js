const WebSocket = require('ws');
const readline = require('readline');
const ws = new WebSocket('ws://localhost:3000');
const { TextEncoder, TextDecoder } = require('text-encoding');

const encoder = new TextEncoder();
const decoder = new TextDecoder();

ws.on('open', () => {
  console.log('Connected to server');
});

ws.on('message', (message) => {
  console.log(`Server: ${decoder.decode(message)}`);
});

ws.on('close', () => {
  console.log('Disconnected from server');
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  ws.send(encoder.encode(input));
});