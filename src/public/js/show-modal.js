const btnsDelete = document.querySelectorAll('.delete');
const modal = document.getElementById('modal');
const btnHideModal = document.getElementById('hideModal');
const idInput = document.getElementById('idValue');

function showModal(e) {
  // show modal on UI
  const id = e.target.getAttribute('id');
  idInput.value = id;
  modal.classList.remove('hidden');
}

function hideModal() {
  // hide modal from UI
  modal.classList.add('hidden');
}

if (btnsDelete) {
  btnsDelete.forEach((btn) => {
    btn.addEventListener('click', showModal);
  });
}

if (btnHideModal) {
  btnHideModal.addEventListener('click', hideModal);
}
