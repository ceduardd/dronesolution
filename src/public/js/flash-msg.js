const msg = document.getElementById('pop-up');

if (msg) {
  async function removeMsg(msg) {
    setTimeout(() => {
      msg.classList.add('hidden');
    }, 3000);
  }

  removeMsg(msg);
}
