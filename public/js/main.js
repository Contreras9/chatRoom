// chat.html <form id="chat-form">
const chatForm = document.getElementById('chat-form')
// chat.html <div class="chat-messages"> append div
const chatMessages = document.querySelector('.chat-messages')

const socket = io()

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
   div.innerHTML = `<p class="meta">Brad <span>9:12pm</span></p>
   <p class="text">
      ${message}
   </p>`
   // chat.html <div class="chat-messages"> append div
   document.querySelector('.chat-messages').appendChild(div)
}
