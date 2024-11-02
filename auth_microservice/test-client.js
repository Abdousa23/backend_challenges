const net = require('net');

const client = new net.Socket();

client.connect(3000, '127.0.0.1', () => {
    console.log('Connected to microservice');
});

// Function to send a message to the microservice
function sendMessage(pattern, data) {
    const message = JSON.stringify({ pattern, data });
    console.log('Sending message:', message);
    client.write(message);
}

// Example: Send a login message after 1 second
setTimeout(() => {
    sendMessage('LOGIN', { username: 'testuser', password: 'testpassword' });
}, 1000);

client.on('data', (data) => {
    console.log('Received:', data.toString());
    client.destroy(); // kill client after server's response
});

client.on('close', () => {
    console.log('Connection closed');
});

client.on('error', (err) => {
    console.error('Error:', err.message);
});