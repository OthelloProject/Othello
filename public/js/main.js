const socket = io();
const chatForm = document.getElementById('chat-form');
let chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

socket.on('message', message => {
    console.log(message);

    if (isStringURL(message.text)) {
        outputLink(message);
    } else {
        outputMessage(message);
    }

    chatMessages.scrollTop = chatMessages.scrollHeight;
});

socket.emit('joinRoom', { username, room });

socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room);
    outputUsers(users);
});

// message sumbit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let msg = e.target.elements.msg.value;

    socket.emit('chatMessage', msg);

    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

//outputs message to DOM
function outputMessage(message) {
    let div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p><p class="text">${message.text}</p>`;
    document.querySelector('.chat-messages').appendChild(div);
}

function outputLink(message) {
    let div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p><a class="text" href=${message.text}>${message.text}</a>`;
    document.querySelector('.chat-messages').appendChild(div);
}

function outputRoomName(room) {
    roomName.innerHTML = room;
}

function outputUsers(users) {
    userList.innerHTML = `${users.map(user => user.username).join(' ')}`;
}

function isStringURL(string) {
    let url;

    try {
        url = new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}