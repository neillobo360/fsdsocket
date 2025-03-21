const socket = io(); // Connect to the server

// Function to toggle between light and dark mode
function toggleDarkMode() {
  const body = document.body;
  const chatContainer = document.getElementById('chat-container');
  const header = document.querySelector('.header');
  const messages = document.querySelector('.messages');
  const messageInput = document.querySelector('.message-input');
  const toggleBtn = document.querySelector('.toggle-btn');

  body.classList.toggle('dark');
  chatContainer.classList.toggle('dark');
  header.classList.toggle('dark');
  messages.classList.toggle('dark');
  messageInput.classList.toggle('dark');
  toggleBtn.classList.toggle('dark');
}

// Send a message when the user clicks the "Send" button
function sendMessage() {
  const messageInput = document.getElementById('message');
  const messageText = messageInput.value.trim();

  if (messageText) {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const isSentByUser = Math.random() > 0.5; // Randomly pick User1 or User2
    const username = isSentByUser ? "User1" : "User2";

    socket.emit('send_message', { message: messageText, timestamp: timestamp, username: username, isSentByUser: isSentByUser });

    messageInput.value = '';
  }
}

// Listen for incoming messages from the server
socket.on('message', (data) => {
  const messagesDiv = document.getElementById('messages');

  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.classList.add(data.isSentByUser ? 'sent' : 'received');

  messageElement.innerHTML = `
    <div class="text">${data.message}</div>
    <div class="timestamp">${data.timestamp}</div>
  `;

  const usernameDiv = document.createElement('div');
  usernameDiv.classList.add('username');
  usernameDiv.textContent = data.username;

  messageElement.prepend(usernameDiv);

  messagesDiv.appendChild(messageElement);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

// Handle file upload
function uploadFile(type) {
  const fileInput = document.querySelector(`#file-upload-${type}`);
  const file = fileInput.files[0];

  if (file) {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const isSentByUser = Math.random() > 0.5;
    const username = isSentByUser ? "User1" : "User2";

    // Simulate sending file as a message (you can replace this with real file handling)
    const messageText = `Uploaded ${type}: ${file.name}`;

    socket.emit('send_message', { message: messageText, timestamp: timestamp, username: username, isSentByUser: isSentByUser });
  }
}
