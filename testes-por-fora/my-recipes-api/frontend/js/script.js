let globalRecipes = [];
let globalFilteredRecipes = [];

async function start() {
  await fetchRecipes();

  render();
  enableFilter();
}

async function fetchRecipes() {
  const response = await fetch('http://localhost:3000/recipes');
  const json = await response.json();
  globalRecipes = json;
  globalRecipes.recipes.sort((a, b) => a.name.localeCompare(b.name));
  globalFilteredRecipes = [...globalRecipes.recipes];
}

function render() {
  divRecipes = document.querySelector('#divRecipes');

  divRecipes.innerHTML = `
    <div class='row'>
      ${globalFilteredRecipes
        .map(({ name, author, howTo, ingredients }) => {
          return `
          <div class='col s6 m3 l4'>
            <div class='flex-row bordered'>

              <div class='flex-column'>

                <div class = 'recipe-header'>
                  <h4>${name}</h4>                
                  <span><em>from:</em> ${author}</span>
                </div>
                
                <div class = 'how-to-make-it'>
                  <p><strong>How to make it?</strong></p>
                  <span>${howTo}</span>
                </div>  

                <div class = 'ingredients-list'>
                  <p><strong>Ingredients:</strong></p>
                  ${makeIngredientList(ingredients)}
                </div>

              </div>
            </div>
          </div>
        `;
        })
        .join('')}      
    </div>  
  `;
}

function makeIngredientList(ingredients) {
  let retorno = '<ul>';

  for (let ingredient of ingredients) {
    const { name, quantity, unit } = ingredient;
    retorno += `<li> ${quantity} ${unit}, ${name} </li>`;
  }
  retorno += '</ul>';
  return retorno;
}

async function enableFilter() {
  const inputFilter = document.querySelector('#inputFilter');
  inputFilter.addEventListener('keyup', handleFilter);
}

async function handleFilter() {
  const inputFilter = document.querySelector('#inputFilter');
  const filterValue = inputFilter.value.trim().toLowerCase();

  globalFilteredRecipes = globalRecipes.recipes.filter((recipe) => {
    return recipe.name.toLowerCase().includes(filterValue);
  });

  render();
}

start();
