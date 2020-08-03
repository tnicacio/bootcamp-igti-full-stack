global.counterRecipe = 0;

export class Recipe {
  constructor(name, author, howTo, ingredients = []) {
    if (!name || !author || !howTo || ingredients.length === 0) {
      throw new Error(
        'name, author, howTo and ingredients are required fields'
      );
    }

    this._id = ++counterRecipe;
    this._name = name;
    this._author = author;
    this._howTo = howTo;
    this._ingredients = ingredients;
    this._createdAt = new Date();
    this._updatedAt = null;
  }

  get toJson() {
    return {
      id: this._id,
      name: this._name,
      author: this._author,
      howTo: this._howTo,
      ingredients: this._ingredients,
      createdAt: this._createdAt,
    };
  }

  get name() {
    return this._name;
  }
  set name(name) {
    this._name = name;
  }

  get author() {
    return this._author;
  }
  set author(author) {
    this._author = author;
  }

  get howTo() {
    return this._howTo;
  }
  set howTo(howTo) {
    this._howTo = howTo;
  }

  get ingredients() {
    return this._ingredients;
  }
  set ingredients(ingredients) {
    this._ingredients = ingredients;
  }

  get createdAt() {
    return this._createdAt;
  }

  /**
   * @param {number} id
   */
  set id(id) {
    this._id = id;
  }
  get id() {
    return this._id;
  }
}
