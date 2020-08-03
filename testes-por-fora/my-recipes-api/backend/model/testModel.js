import { Recipe } from './Recipe.js';
import { Ingredient } from './Ingredient.js';

const ingredient1 = new Ingredient('ovo', 12, 'kg');
const ingredient2 = new Ingredient('leite', 3, 'L');
const ingredient3 = new Ingredient('farinha', 500, 'g');
const recipe = new Recipe('titulo', 'joao', 'assim que faz', [
  ingredient1.toJson,
  ingredient2.toJson,
  ingredient3.toJson,
]);
const recipe2 = new Recipe('titulo2', 'joao Silva', 'outro metodo', {
  name: 'leite',
});

const ovoTeste = recipe.ingredients.find((ing) => ing.name === 'ovo');

console.log(recipe.toJson);
console.log(recipe2.toJson);
console.log(ovoTeste);
