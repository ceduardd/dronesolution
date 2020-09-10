var socket = io();

const settings = document.getElementById('settings-list');
const btnUser = document.getElementById('user');

const wrapperNtf = document.getElementById('wrapperNtf');

socket.on('connect', () => {
  console.log('We was connected');

  socket.emit('registerID'); // register id of current user auth
});

socket.on('renderMessage', (newNotification) => {
  let li = document.createElement('li');
  li.className = 'mb-4 flex justify-between rounded shadow-lg p-6 text-red-600';

  let div1 = document.createElement('h1');
  let div2 = document.createElement('h1');
  div2.className = 'badge bg-red-200 rounded-full px-3 py-2 flex items-center';

  let p1 = document.createElement('p');
  p1.className = 'font-bold';
  p1.textContent = newNotification.type;
  let p2 = document.createElement('p');
  p2.className = 'italic';
  p2.textContent = newNotification.description;

  div1.appendChild(p1);
  div1.appendChild(p2);

  let small = document.createElement('small');
  small.className = 'block text-right p-0 m-auto';
  small.textContent = newNotification.issued_at;

  div2.appendChild(small);

  li.appendChild(div1);
  li.appendChild(div2);

  wrapperNtf.insertBefore(li, wrapperNtf.childNodes[0]);
});

socket.on('received', (message) => {
  console.log(message);
});

if (btnUser) {
  btnUser.addEventListener('click', () => {
    settings.classList.toggle('translate-x-full');
  });
}
