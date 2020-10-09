const datePicker = document.getElementById('date-picker');

datePicker.addEventListener('change', (e) => {
  const now = new Date();
  const input = buildDate(e.target.value);

  if (input < now) {
    e.target.value = '';
    alert('La fecha ingresada es inválida');
  }
});

function buildDate(value) {
  const [year, month, day] = value.split('-');
  const date = new Date(year, month - 1, day);

  return date;
}
