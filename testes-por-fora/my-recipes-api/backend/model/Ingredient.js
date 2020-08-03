global.counterIngredient = 0;

export class Ingredient {
  constructor(name, quantity, unit) {
    if (!name || quantity == null || !unit) {
      throw new Error('name, quantity and unit are required fields');
    }
    this._id = ++counterIngredient;
    this._name = name;
    this._quantity = quantity;
    this._unit = unit;
  }

  get toJson() {
    return {
      id: this._id,
      name: this._name,
      quantity: this._quantity,
      unit: this._unit,
    };
  }

  get name() {
    return this._name;
  }
  set name(name) {
    this._name = name;
  }
  get quantity() {
    return this._quantity;
  }
  set quantity(quantity) {
    this._quantity = quantity;
  }
  get unit() {
    return this._unit;
  }
  set unit(unit) {
    this._unit = unit;
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
