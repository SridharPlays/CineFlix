const http = require('http');
const EventEmitter = require('events');

class TicketBooking extends EventEmitter {}

const ticketBooking = new TicketBooking();

// 1. One-Time Event Listeners (Using 'once' method)
ticketBooking.once('bookTicket', (user, movie) => {
    console.log(`${user} booked a ticket for ${movie}.`);
});

// 2. Inspecting Event Listeners
function logListeners(eventName) {
    console.log(`Listeners for ${eventName}:`, ticketBooking.listeners(eventName));
}

// 3. listeners() Method - Get all listeners for an event
ticketBooking.on('showListeners', (eventName) => {
    logListeners(eventName);
});

// 4. New Listener Event - Fires when a new listener is added
ticketBooking.on('newListener', (event, listener) => {
    console.log(`A new listener was added for the event: ${event}`);
});

// 5. Custom Event Emitter
ticketBooking.on('cancelTicket', (user, movie) => {
    console.log(`${user} canceled a ticket for ${movie}.`);
});

const server = http.createServer((req, res) => {
    if (req.url === '/book' && req.method === 'GET') {
        ticketBooking.emit('bookTicket', 'Alice', 'Inception');
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Ticket booked!\n');
    } else if (req.url === '/cancel' && req.method === 'GET') {
        ticketBooking.emit('cancelTicket', 'Alice', 'Inception');
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Ticket canceled!\n');
    } else if (req.url === '/listeners' && req.method === 'GET') {
        ticketBooking.emit('showListeners', 'bookTicket');
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Check console for listeners.\n');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found\n');
    }
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
