import ClassVariables from './utils/ClassVariables.js';

const cv = new ClassVariables();

window.addEventListener('load', () => {
  cv.setTabCountries(document.querySelector('#tabCountries'));
  cv.setTabFavorites(document.querySelector('#tabFavorites'));
  cv.setAllCountries(document.querySelector('#allCountries'));
  cv.setFavoriteCountries(document.querySelector('#favoriteCountries'));
  cv.setCountCountries(document.querySelector('#countCountries'));
  cv.setCountFavorites(document.querySelector('#countFavorites'));
  cv.setTotalPopulationList(document.querySelector('#totalPopulationList'));
  cv.setTotalPopulationFavorites(
    document.querySelector('#totalPopulationFavorites')
  );
  cv.setNumberFormat(Intl.NumberFormat('pt-BR'));

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
      flag,
    };
  });

  cv.setAllCountries(formattedData);
  render();
}

function render() {
  renderCountryList();
  renderFavoriteList();
  renderSummary();
  handleCountryButtons();
}

function renderCountryList() {
  if (cv.getAllCountries() === null) {
    return;
  }
  let countriesHTML = '<div>';

  cv.getAllCountries().forEach((country) => {
    const { name, flag, id, population } = country;

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
            <li>${population}</li>
          </ul>
        </div>

      </div>
      `;

    countriesHTML += countryHTML;
  });
  countriesHTML += '</div>';
  cv.getTabCountries().innerHTML = countriesHTML;
}

function renderFavoriteList() {
  if (cv.getFavoriteCountries() === null) {
    return;
  }
  let favoritesHTML = '<div>';

  cv.getFavoriteCountries().forEach((country) => {
    const { name, flag, id, population } = country;

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
            <li>${population}</li>
          </ul>
        </div>

      </div>
      `;

    favoritesHTML += favoriteHTML;
  });

  favoritesHTML += '</div>';
  cv.getTabFavorites().innerHTML = favoritesHTML;
}

function renderSummary() {
  let totalCountries = 0;
  let totalPopulation = 0;
  let totalFavorites = 0;
  let totalFavoritePopulation = 0;

  if (cv.getAllCountries()) {
    totalCountries = cv.getAllCountries().length;
    totalPopulation = cv.getAllCountries().reduce((acc, curr) => {
      return acc + curr.population;
    }, 0);
  }

  if (cv.getFavoriteCountries()) {
    totalFavorites = cv.getFavoriteCountries().length;
    totalFavoritePopulation = cv.getFavoriteCountries().reduce((acc, curr) => {
      return acc + curr.population;
    }, 0);
  }

  cv.getCountCountries().textContent = totalCountries;
  cv.getTotalPopulationList().textContent = totalPopulation;
  cv.getCountFavorites().textContent = totalFavorites;
  cv.getTotalPopulationFavorites().textContent = totalFavoritePopulation;

  /*   cv.getCountCountries().textContent =
    (cv.getAllCountries() && cv.getAllCountries().length) || 0;

  cv.getTotalPopulationList().textContent =
    (cv.getAllCountries() &&
      cv.getAllCountries().reduce((acc, curr) => {
        return acc + curr.population;
      }, 0)) ||
    0;

  cv.getCountFavorites().textContent =
    (cv.getFavoriteCountries() && cv.getFavoriteCountries().length) || 0;

  cv.getTotalPopulationFavorites().textContent =
    (cv.getFavoriteCountries() &&
      cv.getFavoriteCountries().reduce((acc, curr) => {
        return acc + curr.population;
      }, 0)) ||
    0; */
}
function handleCountryButtons() {
  let countryButtons = [];
  let favoriteButtons = [];
  if (cv.getTabCountries()) {
    countryButtons = Array.from(cv.getTabCountries().querySelectorAll('.btn'));
    countryButtons.forEach((button) => {
      button.addEventListener('click', () => addToFavorites(button.id));
    });
  }
  if (cv.getTabFavorites()) {
    favoriteButtons = Array.from(cv.getTabFavorites().querySelectorAll('.btn'));
    favoriteButtons.forEach((button) => {
      button.addEventListener('click', () => removeFromFavorites(button.id));
    });
  }
}

function addToFavorites(id) {
  if (!cv.getAllCountries()) {
    return;
  }
  const countryToAdd = cv
    .getAllCountries()
    .find((country) => country.id === id);

  if (!cv.getFavoriteCountries()) {
    cv.setFavoriteCountries([]);
  }

  cv.setFavoriteCountries([...cv.getFavoriteCountries(), countryToAdd]);
  cv.getFavoriteCountries().sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  cv.setAllCountries(
    cv.getAllCountries().filter((country) => country.id !== id)
  );
  render();
}
function removeFromFavorites(id) {
  if (!cv.getFavoriteCountries()) {
    return;
  }
  const favoriteToRemove = cv
    .getFavoriteCountries()
    .find((country) => country.id === id);

  if (!cv.getAllCountries()) {
    cv.setAllCountries([]);
  }
  cv.setAllCountries([...cv.getAllCountries(), favoriteToRemove]);
  cv.getAllCountries().sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
}
