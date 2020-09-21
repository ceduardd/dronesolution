const btnCloseMessage = document.getElementById('closeMessage');
const pop_up = document.getElementById('pop-up');

if (btnCloseMessage) {
  btnCloseMessage.addEventListener('click', (e) => {
    // const parent = btnCloseMessage.parentElement;
    pop_up.classList.add('hidden'); // hidden utility class of tailwind
  });
}
