const chatBox = document.getElementById('chat-box');
const form = document.getElementById('chat-form');
const input = document.getElementById('message-input');

form.addEventListener('submit', e => {
  e.preventDefault();

  const message = input.value.trim();
  if (!message) return;

  // Show user message
  appendMessage(message, 'user-msg');
  input.value = '';

  // Send to backend
  fetch('/api/message', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  })
    .then((res) => res.json())
    .then((data) => {
      appendMessage(data.message, 'server-msg');
    })
    .catch(() => {
      appendMessage('Error communicating with server', 'server-msg');
    });
});

function appendMessage(text, cssClass) {
  const p = document.createElement('p');
  p.textContent = text;
  p.className = cssClass;
  chatBox.appendChild(p);
  chatBox.scrollTop = chatBox.scrollHeight; // scroll to bottom
}
