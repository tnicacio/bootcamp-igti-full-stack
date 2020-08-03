'use-strict';

let input = null;
let foundTab = null;
let statsTab = null;
let findBtn = null;

let allPeople = [];
let foundPeople = [];

let maleCount = 0;
let femaleCount = 0;
let sumAge = 0;
let meanAge = 0;

let numberFormat = Intl.NumberFormat('pt-BR', { maximumSignificantDigits: 4 });

function getVariables() {
  input = document.querySelector('#pesquisar-usuario');
  foundTab = document.querySelector('#found-tab');
  statsTab = document.querySelector('#stats-tab');
  findBtn = document.querySelector('#buscar');
}
function noResults(value) {
  if (value) {
    foundTab.innerHTML = '<h3>Nenhum usuário filtrado</h3>';
    statsTab.innerHTML = '<h3>Nada a ser exibido</h3>';
    return;
  }
  foundTab.innerHTML = `<h2>${foundPeople.length} usuário(s) encontrado(s)<h2>`;
  statsTab.classList.add('stats-with-values');
  statsTab.innerHTML = '<h2>Estatísticas</h2>';
}

async function getData() {
  const data = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  const dataJson = await data.json();

  const formattedData = dataJson.results.map((person) => {
    const { name, picture, dob, gender } = person;

    return {
      name: `${name.first} ${name.last}`,
      picture: picture.thumbnail,
      age: dob.age,
      gender,
    };
  });
  allPeople = formattedData;
}

function addEvents() {
  input.addEventListener('keyup', search);
  findBtn.addEventListener('click', search);
}

function search(event) {
  if (!input.value || input.value.length === 0) {
    findBtn.classList.add('disabled');
    return;
  }

  if (input.value.length > 0 && findBtn.classList.contains('disabled')) {
    findBtn.classList.remove('disabled');
  }

  if (event.type === 'keyup' && event.key !== 'Enter') {
    return;
  }

  event.preventDefault();
  filterResults(input.value, allPeople);
  render();
}

function filterResults(value, list) {
  getFoundPeople(value, list);
  getStatsValues();
}

function getFoundPeople(value, list) {
  foundPeople = list
    .filter((people) => {
      return people.name.toLowerCase().includes(value.toLowerCase());
    })
    .sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
}

function getStatsValues() {
  maleCount = foundPeople.filter((people) => people.gender === 'male').length;
  // prettier-ignore
  femaleCount = foundPeople.filter((people) => people.gender === 'female').length;
  sumAge = foundPeople.reduce((acc, curr) => {
    return acc + curr.age;
  }, 0);
  meanAge = foundPeople.length > 0 ? sumAge / foundPeople.length : 0;
}

function render() {
  if (foundPeople.length === 0) {
    noResults(true);
    return;
  }
  noResults(false);
  renderFounds();
  renderStats();
}

function renderFounds() {
  let foundsHTML = '<div>';

  foundPeople.forEach((people) => {
    const { picture, name, age } = people;

    const foundHTML = `
      <div class = "person">

      <div>
        <img src="${picture}" alt="${name}">
      </div>

      <div>
        ${name}, ${age}
      </div>

      </div>
    `;

    foundsHTML += foundHTML;
  });

  foundsHTML += '</div>';
  foundTab.innerHTML += foundsHTML;
}

function renderStats() {
  statsTab.innerHTML += `
  <div class = "stats-list">
    <ul>
      <li>Sexo masculino: </li>
      <li>Sexo feminino: </li>
      <li>Soma das idades: </li>
      <li>Média das idades: </li>
    </ul>

    <ul>
      <li> <b>${maleCount}</b> </li>
      <li> <b>${femaleCount}</b> </li>
      <li> <b>${formatNumber(sumAge)}</b> </li>
      <li> <b>${formatNumber(meanAge)}</b> </li>
  </div>`;
}

function formatNumber(number) {
  return numberFormat.format(number);
}
