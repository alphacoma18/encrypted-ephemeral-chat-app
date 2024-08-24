import io from 'socket.io-client';
const socket = io('ws://localhost:3000');

const messagesDiv = document.getElementById('messages') as HTMLDivElement;
const form = document.getElementById('form') as HTMLFormElement;

function promptForName() {
    const name = prompt('Enter your name');
    if (!name) {
        alert('Name is required');
        return promptForName();
    }
    return name;
}

const name = promptForName();

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const textarea = document.getElementById('textarea') as HTMLTextAreaElement;
    const message = name + ': ' + textarea.value;
    console.log('name:', name);
    textarea.value = '';
    socket.emit('message', message);
});

socket.on('connect', () => {
    console.log('connected');
});

socket.on('disconnect', () => {
    console.log('disconnected');
});


socket.on('message', (message) => {
    console.log('Received message:', message);
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messagesDiv.appendChild(messageElement);
});
