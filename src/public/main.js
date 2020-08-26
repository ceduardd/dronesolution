const btnCloseMessage = document.getElementById('closeMessage');

btnCloseMessage.addEventListener('click', (e) => {
  const parent = btnCloseMessage.parentElement;
  console.log(parent);
  parent.classList.add('hidden'); // hidden utility class of tailwind
});
