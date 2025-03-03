const http = require('http');
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

myEmitter.once('oneTimeEvent', () => {
    console.log('This will run only once.');
});

myEmitter.on('checkListeners', () => {
    console.log('Listeners for oneTimeEvent:', myEmitter.listenerCount('oneTimeEvent'));
});

myEmitter.on('testEvent', () => console.log('Test Event 1 triggered.'));
myEmitter.on('testEvent', () => console.log('Test Event 2 triggered.'));

myEmitter.on('newListener', (event, listener) => {
    console.log(`New listener added for: ${event}`);
});

myEmitter.on('customEvent', (data) => {
    console.log(`Custom Event Triggered with Data: ${data}`);
});

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Node.js Local Server with Event Operations\n');
    
    myEmitter.emit('oneTimeEvent');
    myEmitter.emit('checkListeners');
    myEmitter.emit('testEvent');
    myEmitter.emit('customEvent', 'Hello from Custom Event!');
    
    res.end('Operations Completed. Check Console for Logs.');
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
