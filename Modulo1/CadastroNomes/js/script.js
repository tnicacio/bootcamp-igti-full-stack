window.addEventListener('load', start);

let globalNames = ['Um', 'Dois', 'Três', 'Quatro'];
let inputName = null;
let isEditing = false;
let currentIndex = null;

function start(event) {
  console.log('Página carregada com sucesso');
  inputName = document.querySelector('#inputName');

  preventFormSubmit();
  activateInput();
  render();
}

function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }
  const form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
}

f;

function activateInput() {
  function insertName(name) {
    globalNames.push(name);
    render();
  }

  function updateName(name) {
    globalNames[currentIndex] = name;
    render();
  }

  function handleTyping(event) {
    const name = event.target.value;
    if (event.key !== 'Enter' || name.trim() === '') {
      return;
    }

    if (isEditing) {
      updateName(name);
    } else {
      insertName(name);
    }
    isEditing = false;
    clearInput();
  }

  inputName.focus();
  inputName.addEventListener('keyup', handleTyping);
}

function render() {
  function createDeleteButton(index) {
    function deleteName() {
      globalNames.splice(index, 1);
      render();
    }
    const button = document.createElement('button');
    button.classList.add('deleteButton');
    button.textContent = 'x';
    button.addEventListener('click', deleteName);
    return button;
  }

  function createSpan(name, index) {
    function editItem() {
      inputName.value = name;
      inputName.focus();
      isEditing = true;
      currentIndex = index;
    }

    const span = document.createElement('span');
    span.classList.add('clickable');
    span.textContent = name;

    span.addEventListener('click', editItem);

    return span;
  }

  const divNames = document.querySelector('#names');
  divNames.innerHTML = '';

  const ul = document.createElement('ul');

  for (let i = 0; i < globalNames.length; i++) {
    const currentName = globalNames[i];

    const li = document.createElement('li');
    const button = createDeleteButton(i);
    const span = createSpan(currentName, i);

    li.appendChild(button);
    li.appendChild(span);

    ul.appendChild(li);
  }

  divNames.appendChild(ul);
  clearInput();
}

function clearInput() {
  inputName.value = '';
  inputName.focus();
}
