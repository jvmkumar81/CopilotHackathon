
const socket = io();

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.querySelector('input');
  socket.emit('chat message', input.value);
  input.value = '';
});

socket.on('chat message', (msg) => {
  const item = document.createElement('li');
  item.textContent = msg;
  document.querySelector('ul').appendChild(item);
});
fetch('https://randomuser.me/api/?results=10')
  .then(response => response.json())
  .then(data => console.log(data.results));
fetch('https://picsum.photos/v2/list?page=2&limit=100')
  .then(response => response.json())
  .then(data => console.log(data));