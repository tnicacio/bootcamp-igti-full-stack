import express from 'express';
import { promises as fs } from 'fs';
import statesRouter from './routes/statesWithCities.js';
import { createFiles } from './controllers/statesController.js';

global.resultPath = './results/';

const app = express();

app.use(express.json());
app.use('/state', statesRouter);

app.listen(3000, () => {
  try {
    createFiles();
    console.log('API Started!');
  } catch (err) {
    console.log(err.message);
  }
});

/* let resultPath = './results/';
let states = [];
let cities = [];

let statesWithCities = [];

function getCitiesByStateID(stateID) {
  return cities.cidades.filter((cidade) => {
    return cidade.Estado == stateID;
  });
}


async function mergeStatesWithCities() {
  try {
    let statesWithCities = [];
    let index = 0;
    let citiesOf = [];

    for (let state of states.estados) {
      citiesOf = await getCitiesOf(state.Sigla);

      statesWithCities.push({
        stateID: state.ID,
        stateSigla: state.Sigla,
        stateNome: state.Nome,
        numOfCities: citiesOf.length,
        cities: citiesOf,
      });
      index++;
    }
    // statesWithCities.forEach((data) => console.log(data.stateSigla));
    //  let fileName = `${resultPath}/teste/resultsTeste.json`;
    // fs.writeFile(fileName, JSON.stringify(statesWithCities));
    return statesWithCities;
  } catch (err) {
    console.log(err);
  }
}


async function getStateWithCityQuantity() {
  try {
    let stateWithCityQuantity = [];

    for (let state of states.estados) {
      const { Sigla } = state;
      let numCities = await getCitiesQuantityOf(Sigla);
      let obj = {
        UF: Sigla,
        numCities,
      };
      stateWithCityQuantity.push(obj);
    }

    stateWithCityQuantity.sort((a, b) => {
      return b.numCities - a.numCities;
    });

    return stateWithCityQuantity;
  } catch (err) {
    console.log(err);
  }
}

// 3. Criar um método que imprima no console um array com o UF dos cinco estados
// que mais possuem cidades, seguidos da quantidade, em ordem decrescente. Você
// pode usar a função criada no tópico 2. Exemplo de impressão: [“UF - 93”, “UF - 82”,
// “UF - 74”, “UF - 72”, “UF - 65”]
async function getTop5() {
  try {
    let stateWithCityQuantity = await getStateWithCityQuantity();
    let top = 5;

    let data = [];
    for (let i = 0; i < top; i++) {
      data.push(stateWithCityQuantity[i]);
    }
    const retorno = {
      top5: data,
    };
    return retorno;
  } catch (err) {
    console.log(err);
  }
}

// 4. Criar um método que imprima no console um array com o UF dos cinco estados
// que menos possuem cidades, seguidos da quantidade, em ordem decrescente.
// Você pode usar a função criada no tópico 2. Exemplo de impressão: [“UF - 30”, “UF
// - 27”, “UF - 25”, “UF - 23”, “UF - 21”]
async function getBottom5() {
  try {
    let stateWithCityQuantity = await getStateWithCityQuantity();
    let bottom = 5;

    let data = [];
    const tam = stateWithCityQuantity.length;
    for (let i = tam - 5; i < tam; i++) {
      data.push(stateWithCityQuantity[i]);
    }

    const retorno = {
      bottom5: data,
    };
    return retorno;
  } catch (err) {
    console.log(err);
  }
}

// 5. Criar um método que imprima no console um array com a cidade de maior nome de
// cada estado, seguida de seu UF. Por exemplo: [“Nome da Cidade – UF”, “Nome da
// Cidade – UF”, ...].
async function getLongestCityNames() {
  try {
    let statesWithCities = await mergeStatesWithCities();
    let retorno = [];

    statesWithCities.forEach((data) => {
      const { cities, stateSigla } = data;
      const citiesSortedByNameLength = cities.sort((a, b) => {
        return b.Nome.length - a.Nome.length || a.Nome.localeCompare(b.Nome);
      });

      const longestCity = citiesSortedByNameLength[0];
      let obj = {
        state: stateSigla,
        longestCityName: longestCity.Nome,
      };
      retorno.push(obj);
    });
    return retorno;
  } catch (err) {
    console.log(err);
  }
}

// 6. Criar um método que imprima no console um array com a cidade de menor nome
// de cada estado, seguida de seu UF. Por exemplo: [“Nome da Cidade – UF”, “Nome
// da Cidade – UF”, ...].

async function getSmallestCityNames() {
  try {
    let statesWithCities = await mergeStatesWithCities();
    let retorno = [];

    statesWithCities.forEach((data) => {
      const { cities, stateSigla } = data;
      const citiesSortedByNameLength = cities.sort((a, b) => {
        return a.Nome.length - b.Nome.length || a.Nome.localeCompare(b.Nome);
      });

      const smallestCity = citiesSortedByNameLength[0];
      let obj = {
        state: stateSigla,
        smallestCityName: smallestCity.Nome,
      };
      retorno.push(obj);
    });
    return retorno;
  } catch (err) {
    console.log(err);
  }
}

// 7. Criar um método que imprima no console a cidade de maior nome entre todos os
// estados, seguido do seu UF. Exemplo: “Nome da Cidade - UF".

async function getLongestCityNameOfAll() {
  try {
    let longestCityName = (await getLongestCityNames()).sort((a, b) => {
      return (
        b.longestCityName.length - a.longestCityName.length ||
        a.longestCityName.localeCompare(b.longestCityName)
      );
    });
    return longestCityName[0];
  } catch (err) {
    console.log(err);
  }
}

async function getSmallestCityNameOfAll() {
  try {
    let smallestCityName = (await getSmallestCityNames()).sort((a, b) => {
      return (
        a.smallestCityName.length - b.smallestCityName.length ||
        a.smallestCityName.localeCompare(b.smallestCityName)
      );
    });
    return smallestCityName[0];
  } catch (err) {
    console.log(err);
  }
} */
/* 
async function run() {
  await initData();
  await writeResults(resultPath);
  console.log(await getTop5());
  console.log(await getBottom5());
  console.log(await getLongestCityNames());
  console.log(await getSmallestCityNames());
  console.log(await getLongestCityNameOfAll());
  console.log(await getSmallestCityNameOfAll());

  console.log(853 + 645 + 496 + 417 + 399);
  console.log(52 + 22 + 16 + 15 + 1);
}

run(); */
