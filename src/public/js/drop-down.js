const btnBurger = document.getElementById('burger');

if (btnBurger) {
  const list = document.getElementById('list'); // get list

  btnBurger.addEventListener('click', () => {
    list.classList.toggle('translate-x-full');
  });
}
