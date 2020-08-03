import express from 'express';
import { promises as fs } from 'fs';
import { Recipe } from '../model/Recipe.js';
import { Ingredient } from '../model/Ingredient.js';

const { readFile, writeFile } = fs;
const router = express.Router();

router.get('/', async (_req, res, next) => {
  try {
    const data = JSON.parse(await readFile(`../backend/${global.fileName}`));
    delete data.nextId;
    res.send(data);
    logger.info('GET /recipes');
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    let recipe = req.body;

    const { name, author, howTo, ingredients } = recipe;

    recipe = new Recipe(name, author, howTo, ingredients);
    const data = JSON.parse(await readFile(`../backend/${global.fileName}`));
    recipe.id = data.nextId++;

    let ingredientsList = [];
    for (let i = 0; i < recipe.ingredients.length; i++) {
      const { name, quantity, unit } = recipe.ingredients[i];
      const ingredient = new Ingredient(name, quantity, unit);
      ingredient.id = i + 1;
      ingredientsList.push(ingredient.toJson);
    }
    recipe.ingredients = ingredientsList;

    data.recipes.push(recipe.toJson);
    await writeFile(
      `../backend/${global.fileName}`,
      JSON.stringify(data, null, 2)
    );

    res.send(recipe.toJson);
    logger.info(`POST /grade - ${JSON.stringify(recipe.toJson)}`);
  } catch (err) {
    next(err);
  }
});

router.get('/recipe/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(`../backend/${global.fileName}`));
    const recipe = data.recipes.find((recipe) => {
      return recipe.id === Number(req.params.id);
    });
    res.send(recipe);
    logger.info(`GET /recipe/:id - ${req.params.id}`);
  } catch (err) {
    next(err);
  }
});

router.delete('/recipe/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(`../backend/${global.fileName}`));

    const recipeToDelete = data.recipes.find((recipe) => {
      return recipe.id === Number(req.params.id);
    });

    if (recipeToDelete === -1) {
      throw new Error(`Recipe not found`);
    }
    res.send(recipeToDelete);
    data.recipes = data.recipes.filter((recipe) => {
      return recipe.id !== Number(req.params.id);
    });
    await writeFile(
      `../backend/${global.fileName}`,
      JSON.stringify(data, null, 2)
    );
    logger.info(
      `DELETE /recipes/recipe/:id - ${JSON.stringify(recipeToDelete)}`
    );
  } catch (err) {
    next(err);
  }
});

router.put('/updateRecipe/:id', async (req, res, next) => {
  try {
    const recipe = req.body;
    recipe.id = Number(req.params.id);

    const { id, name, author, howTo, ingredients } = recipe;

    if (!id || !name || !author || !howTo || ingredients.length === 0) {
      throw new Error('id, name, author, howTo and ingredients are required!');
    }

    if (ingredients.length) {
      ingredients.forEach((ingredient) => {
        const { name, quantity, unit } = ingredient;
        if (!name || quantity == null || !unit) {
          throw new Error(
            'name, quantity and unit are ingredients required fields'
          );
        }
      });
    }

    const data = JSON.parse(await readFile(`../backend/${global.fileName}`));
    const index = data.recipes.findIndex((rec) => rec.id === recipe.id);

    if (index === -1) {
      throw new Error('No recipe with such id');
    }

    data.recipes[index].name = name;
    data.recipes[index].author = author;
    data.recipes[index].howTo = howTo;

    let ingredientsList = [];
    for (let i = 0; i < ingredients.length; i++) {
      const { name, quantity, unit } = ingredients[i];
      const ingredient = new Ingredient(name, quantity, unit);
      ingredient.id = i + 1;
      ingredientsList.push(ingredient.toJson);
    }
    data.recipes[index].ingredients = ingredientsList;
    data.recipes[index].updatedAt = new Date();

    await writeFile(
      `../backend/${global.fileName}`,
      JSON.stringify(data, null, 2)
    );
    res.send(data.recipes[index]);
    logger.info(
      `PUT /recipes/updateRecipe/:id - ${JSON.stringify(data.recipes[index])}`
    );
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message });
});

export default router;
