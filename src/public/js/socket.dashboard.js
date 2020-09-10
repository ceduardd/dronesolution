var socket = io();

const poolUsers = document.querySelector('.poolUsers');

const title = document.getElementById('title');
const dni = document.getElementById('dni');
const id = document.getElementById('id');
const description = document.getElementById('description');

socket.on('connect', () => {
  console.log('We was connected');

  socket.emit('registerIDAdmin');
});

socket.on('received', (message) => {
  console.log(message);
});

socket.on('addUsers', (users) => {
  console.log(users);
  renderUsers(users);
});

btn.addEventListener('click', (e) => {
  e.preventDefault();

  const notification = {
    id: id.value,
    dni: dni.value,
    type: type.value,
    description: description.value,
    issued_at: new Date(),
  };

  socket.emit('sendNotification', notification);

  console.log(notification);
});

function renderUsers(users) {
  let html = '';

  for (let i = 0; i < users.length; i++) {
    html += `<div class="connections rounded p-4 bg-blue-300">
              <div>
                <p class="inline-block font-bold">Nombre:</p>
                ${users[i].name}
              </div>
              <div>
                <p class="inline-block font-bold">Conexión ID:</p>
                ${users[i].id}
              </div>
              <div>
                <p class="inline-block font-bold">Email:</p>
                ${users[i].email}
              </div>
              <div>
                <p class="inline-block font-bold">DNI:</p>
                ${users[i].dni}
              </div>
              <button class="copies">
                Copiar Datos
              </button>
            </div>`;
  }

  poolUsers.innerHTML = html;
}
