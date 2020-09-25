var socket = io();

const poolUsers = document.querySelector('.poolUsers');

const form = document.getElementById('form-message');

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
  // console.log(users);
  renderUsers(users);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const notification = {
    id: id.value,
    dni: dni.value,
    type: type.value,
    description: description.value,
    issued_at: new Date(),
  };

  socket.emit('sendNotification', notification);

  $('#form-message')[0].reset();
});

function copyData(e) {
  const data = e.target.getAttribute('id');

  console.log(data);
  const [userID, userDNI] = data.split(' ');

  dni.value = userDNI;
  id.value = userID;
}

function renderUsers(users) {
  let html = '';

  for (let i = 0; i < users.length; i++) {
    html += `<div class="card text-white bg-dark mb-3">
              <div class="card-header flex justify-between items-center">
                <p class="m-0"><i class="far fa-user mr-2"></i>${users[i].name}</p>
                <button id="${users[i].id} ${users[i].dni}" class="copy btn btn-success ml-auto">
                  Select
                </button>
              </div>
              <div class="card-body">
                <p class="card-text">${users[i].email}</p>
                <p class="card-text">${users[i].dni}</p>
              </div>
            </div>`;
  }

  poolUsers.innerHTML = html;

  const btnsCopy = document.querySelectorAll('.copy');

  btnsCopy.forEach((btnCopy) => btnCopy.addEventListener('click', copyData));
}
