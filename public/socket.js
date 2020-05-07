window.socket = null;

function establishSocketConnection(userId) {
  try {
    window.socket = io('/', {query: 'userId=' + currentUserId});
  } catch (error) {
    alert('Something went wrong; Can\'t connect to socket server');
  }
}

function getChatList(userId, cb) {
  window.socket.emit('chat-list', {
      userId: userId
  });
  window.socket.on('chat-list-response', (data) => {
    cb(data);
  });
}

function sendMessage(message) {
  window.socket.emit('add-message', message);
}

function receiveMessage(cb) {
  window.socket.on('add-message-response', (data) => {
    cb(data);
  });
}

function logout(userId, cb) {
  window.socket.emit('logout', userId);
  window.socket.on('logout-response', (data) => {
    cb(data);
  });
}