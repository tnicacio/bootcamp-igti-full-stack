import { promises } from 'fs';

const { readFile, writeFile } = promises;

let resultPath = './results/';

// 1. Criar uma função que irá criar um arquivo JSON para cada estado representado no
// arquivo Estados.json, e o seu conteúdo será um array das cidades pertencentes a
// aquele estado, de acordo com o arquivo Cidades.json. O nome do arquivo deve ser
// o UF do estado, por exemplo: MG.json.
async function createFiles() {
  try {
    // const states = JSON.parse(await readFile('./Estados.json'));
    // const cities = JSON.parse(await readFile('./Cidades.json'));

    const [states, cities] = await readInitialFiles();

    for (let state of states.estados) {
      const { ID, Sigla } = state;
      let fileName = `${resultPath}${Sigla}.json`;

      const stateCities = cities.cidades.filter((city) => city.Estado === ID);
      await writeFile(fileName, JSON.stringify(stateCities), { flag: 'wx' });
    }
  } catch (err) {
    console.log(err.message);
  }
}

async function readInitialFiles() {
  const states = JSON.parse(await readFile('./Estados.json'));
  const cities = JSON.parse(await readFile('./Cidades.json'));
  return [states, cities];
}

// 2. Criar uma função que recebe como parâmetro o UF do estado, realize a leitura do
// arquivo JSON correspondente e retorne a quantidade de cidades daquele estado
async function getCitiesQuantityOf(UF) {
  return (await getCitiesOf(UF)).length;
}

async function getCitiesOf(UF) {
  try {
    let fileName = `${resultPath}${UF}.json`;
    const cities = JSON.parse(await readFile(fileName));
    return cities;
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
    let result = [];
    stateWithCityQuantity.slice(0, 5).forEach((item) => result.push(item));
    return { top5: result };
  } catch (err) {
    console.log(err);
  }
}

async function getStateWithCityQuantity() {
  try {
    let stateWithCityQuantity = [];
    const [states] = await readInitialFiles();

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

// 4. Criar um método que imprima no console um array com o UF dos cinco estados
// que menos possuem cidades, seguidos da quantidade, em ordem decrescente.
// Você pode usar a função criada no tópico 2. Exemplo de impressão: [“UF - 30”, “UF
// - 27”, “UF - 25”, “UF - 23”, “UF - 21”]
async function getBottom5() {
  try {
    let stateWithCityQuantity = await getStateWithCityQuantity();
    let result = [];
    stateWithCityQuantity.slice(-5).forEach((item) => result.push(item));
    return { bottom5: result };
  } catch (err) {
    console.log(err);
  }
}

export { createFiles, getCitiesOf, getCitiesQuantityOf, getTop5, getBottom5 };
