'use-strict';

let tabCountries = null;
let tabFavorites = null;
let allCountries = [];
let favoriteCountries = [];
let countCountries = 0;
let countFavorites = 0;
let totalPopulationList = 0;
let totalPopulationFavorites = 0;
let numberFormat = null;

window.addEventListener('load', () => {
  tabCountries = document.querySelector('#tabCountries') || null;
  tabFavorites = document.querySelector('#tabFavorites') || null;
  allCountries = document.querySelector('#allCountries') || [];
  favoriteCountries = document.querySelector('#favoriteCountries' || []);
  countCountries = document.querySelector('#countCountries') || 0;
  countFavorites = document.querySelector('#countFavorites') || 0;
  totalPopulationList = document.querySelector('#totalPopulationList') || 0;
  totalPopulationFavorites =
    document.querySelector('#totalPopulationFavorites') || 0;
  numberFormat = Intl.NumberFormat('pt-BR');

  fetchCountries();
});

async function fetchCountries() {
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const resJson = await res.json();

  const formattedData = resJson.map((country) => {
    const { numericCode, translations, population, flag } = country;

    return {
      id: numericCode,
      name: translations.pt,
      population,
      formattedPopulation: formatNumber(population),
      flag,
    };
  });

  allCountries = formattedData;
  render();
}

function render() {
  renderCountryList();
  renderFavoriteList();
  renderSummary();
  handleCountryButtons();
}

function renderCountryList() {
  let countriesHTML = '<div>';

  allCountries.forEach((country) => {
    const { name, flag, id, population, formattedPopulation } = country;

    const countryHTML = `
      <div class='country'>
        
        <div>
          <a id="${id}" class="waves-effect waves-light btn">+</a>
        </div>

        <div>
          <img src="${flag}" alt="${name}">
        </div>
        
        <div>
          <ul>
            <li>${name}</li>
            <li>${formattedPopulation}</li>
          </ul>
        </div>

      </div>
      `;

    countriesHTML += countryHTML;
  });
  countriesHTML += '</div>';
  tabCountries.innerHTML = countriesHTML;
}

function renderFavoriteList() {
  if (!favoriteCountries) {
    return;
  }

  let favoritesHTML = '<div>';

  favoriteCountries.forEach((country) => {
    const { name, flag, id, population, formattedPopulation } = country;

    const favoriteHTML = `
      <div class='country'>
        
        <div>
          <a id="${id}" class="waves-effect waves-light btn red darken-4">-</a>
        </div>

        <div>
          <img src="${flag}" alt="${name}">
        </div>
        
        <div>
          <ul>
            <li>${name}</li>
            <li>${formattedPopulation}</li>
          </ul>
        </div>

      </div>
      `;

    favoritesHTML += favoriteHTML;
  });

  favoritesHTML += '</div>';
  tabFavorites.innerHTML = favoritesHTML;
}

function renderSummary() {
  let totalCountries = 0;
  let totalCountriesPopulationList = 0;
  let totalFavoriteCountries = 0;
  let totalFavoritesPopulationList = 0;

  if (allCountries) {
    totalCountries = allCountries.length;
    totalCountriesPopulationList = allCountries.reduce((acc, curr) => {
      return acc + curr.population;
    }, 0);
  }
  if (favoriteCountries) {
    totalFavoriteCountries = favoriteCountries.length;
    totalFavoritesPopulationList = favoriteCountries.reduce((acc, curr) => {
      return acc + curr.population;
    }, 0);
  }

  countCountries.textContent = formatNumber(totalCountries);
  totalPopulationList.textContent = formatNumber(totalCountriesPopulationList);
  countFavorites.textContent = formatNumber(totalFavoriteCountries);
  totalPopulationFavorites.textContent = formatNumber(
    totalFavoritesPopulationList
  );
}

function handleCountryButtons() {
  let countryButtons = [];
  let favoriteButtons = [];
  if (tabCountries) {
    countryButtons = Array.from(tabCountries.querySelectorAll('.btn'));
    countryButtons.forEach((button) => {
      button.addEventListener('click', () => addToFavorites(button.id));
    });
  }
  if (tabFavorites) {
    favoriteButtons = Array.from(tabFavorites.querySelectorAll('.btn'));
    favoriteButtons.forEach((button) => {
      button.addEventListener('click', () => removeFromFavorites(button.id));
    });
  }
}

function addToFavorites(id) {
  if (!allCountries) {
    return;
  }
  const countryToAdd = allCountries.find((country) => country.id === id);

  if (!favoriteCountries) {
    favoriteCountries = [];
  }

  favoriteCountries = [...favoriteCountries, countryToAdd];
  favoriteCountries.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  allCountries = allCountries.filter((country) => country.id !== id);
  render();
}
function removeFromFavorites(id) {
  if (!favoriteCountries) {
    return;
  }
  const favoriteToRemove = favoriteCountries.find(
    (country) => country.id === id
  );
  if (!allCountries) {
    allCountries = [];
  }
  allCountries = [...allCountries, favoriteToRemove];
  allCountries.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  favoriteCountries = favoriteCountries.filter((country) => country.id !== id);
  render();
}

function formatNumber(number) {
  return numberFormat.format(number);
}
