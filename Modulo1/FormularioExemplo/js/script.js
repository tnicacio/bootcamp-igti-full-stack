window.addEventListener('load', start);

let nameInput = document.querySelector('#nameInput');

function start() {
  console.log('Exemplo');
  console.log('Página totalmente carregada');
  nameInput.addEventListener('keyup', countName);

  let form = document.querySelector('form');
  form.addEventListener('submit', preventSubmit);
}

function countName(event) {
  let count = event.target.value.length;
  let span = document.querySelector('#nameLength');
  span.textContent = count;
}

function preventSubmit(event) {
  event.preventDefault();
  alert(nameInput.value + ' cadastrado com sucesso!');
}
