// chat.html <form id="chat-form">
const chatForm = document.getElementById('chat-form')
// chat.html <div class="chat-messages"> append div
const chatMessages = document.querySelector('.chat-messages')
// chat.html <h2 id="room-name">
const roomName = document.getElementById('room-name')
// chat.html <h2 id="users">
const userList = document.getElementById('users')
// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
   ignoreQueryPrefix: true
})

const socket = io()

// Join ChatRoom
socket.emit('joinRoom', { username, room })

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
   outputRoomName(room)
   outputUsers(users)
})

// Message from Server
socket.on('message', message => {
   console.log(message)
   outputMessage(message)

   // Scroll down
   chatMessages.scrollTop = chatMessages.scrollHeight
})

// Message submit
chatForm.addEventListener('submit', (e) => {
   e.preventDefault()

   // Get message text
   const msg = e.target.elements.msg.value

   // Emit message to server
   socket.emit('chatMessage', msg)

   // Clear input
   e.target.elements.msg.value = ''
   e.target.elements.msg.focus()
})

// Output message to DOM
function outputMessage(message) {
   const div = document.createElement('div')
   div.classList.add('message')
   // chat.html <div class="message"> 2 <p>
   div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
   <p class="text">
      ${message.text}
   </p>`
   // chat.html <div class="chat-messages"> append div
   document.querySelector('.chat-messages').appendChild(div)
}

// Add room name to DOM
function outputRoomName(room) {
   roomName.innerText = room
}

// Add users to DOM
function outputUsers(users) {
   userList.innerHTML = `${users.map(user => `<li>${user.username}</li>`).join('')}`
}
