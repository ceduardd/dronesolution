const btnCloseMessage = document.getElementById('closeMessage');

if (btnCloseMessage) {
  btnCloseMessage.addEventListener('click', (e) => {
    const parent = btnCloseMessage.parentElement;
    parent.classList.add('hidden'); // hidden utility class of tailwind
  });
}
